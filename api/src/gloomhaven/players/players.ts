import { v4 as uuidv4 } from 'uuid';

import { getDatabase } from "../db"
import { getCampaign } from "../campaign/campaign"
import { GloomhavenError, GloomhavenErrors } from "../errors"
import { GloomhavenPlayer, GloomhavenPlayerAddDto, GloomhavenPlayerEditDto } from './players.types';

export async function deletePlayer(playerID: string): Promise<boolean> {
    const db = getDatabase()
    let returnValue = false
    let index = -1
    try {
        index = await db.getIndex("/players", playerID)
        if (index < 0) {
            throw new GloomhavenError(GloomhavenErrors.PLAYER_NOT_FOUND)
        }
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.PLAYER_NOT_FOUND)
    }

    try {
        await db.delete(`/players[${index}]`)
        returnValue = true;
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.GENERIC)
    }

    return returnValue
}

export async function deletePlayersFromCompaign(campaignID: string): Promise<void> {
    const db = getDatabase()
    const players = await getPlayersInCampaign(campaignID)
    if (players && players.length > 0) {
        const totalPlayers = players.length
        for (let i = 0; i < totalPlayers; i++) {
            const id = players[i].id
            const index = await db.getIndex("/players", id)
            try {
                await db.delete(`/players[${index}]`)
                await db.save()
            } catch (e) { }
        }
    }
}

export async function getPlayersInCampaign(campaignID: string): Promise<GloomhavenPlayer[]> {
    const db = getDatabase()
    try {
        const players = await db.getObject<GloomhavenPlayer[]>("/players")
        if (players) {
            const found = await db.filter("/players", (player: GloomhavenPlayer) => {
                return player.campaignID === campaignID
            })
            if (found) {
                return found as GloomhavenPlayer[]
            }
        }
    } catch (e) { }

    return []
}

export async function addPlayerToCampaign(campaignID: string, payload: GloomhavenPlayerAddDto): Promise<GloomhavenPlayer> {
    const db = getDatabase()
    const player: GloomhavenPlayer = {
        id: uuidv4(),
        campaignID: campaignID,
        level: 0,
        xp: 0,
        gold: 0,
        goldTokens: 0,
        ...payload,
    }

    const campaign = await getCampaign(campaignID)
    if (campaign) {
        const players = await getPlayersInCampaign(campaignID)
        if (players) {
            const totalPlayers = players.length
            if (totalPlayers >= 4) {
                throw new GloomhavenError(GloomhavenErrors.MAX_PLAYERS_EXCEEDED)
            }

            const found = players.find((_player) => {
                return _player.character === player.character
            })

            if (found) {
                console.log('Player type already exists : ', player.character);
                throw new GloomhavenError(GloomhavenErrors.PLAYER_TYPE_ALREADY_IN_CAMPAIGN)
            }

            try {
                await db.push("/players[]", player, true);
                return player
            } catch (e) { }
        }
    }
    throw new GloomhavenError(GloomhavenErrors.GENERIC)
}

export async function getPlayer(playerID: string = ""): Promise<GloomhavenPlayer> {
    if (playerID === "") {
        throw new GloomhavenError(GloomhavenErrors.PLAYER_NOT_FOUND)
    }
    const db = getDatabase()
    try {
        const player = await db.find<GloomhavenPlayer>("/players", (player: GloomhavenPlayer) => {
            return player.id === playerID
        })
        if (!player) {
            throw new GloomhavenError(GloomhavenErrors.PLAYER_NOT_FOUND)
        }
        return player
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.PLAYER_NOT_FOUND)
    }
}

export async function updatePlayer(playerID: string = "", payload: GloomhavenPlayerEditDto): Promise<GloomhavenPlayer> {
    if (playerID === "") {
        throw new GloomhavenError(GloomhavenErrors.PLAYER_NOT_FOUND)
    }
    const player = await getPlayer(playerID)
    const db = getDatabase()

    const updatedPlayer: GloomhavenPlayer = { ...player, ...payload }
    const indexFound = await db.getIndex("/players", playerID)
    try {
        await db.delete(`/players[${indexFound}]`)
        await db.reload()
        await db.push("/players[]", updatedPlayer, true);
        return updatedPlayer
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.GENERIC)
    }
}