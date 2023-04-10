import { v4 as uuidv4 } from 'uuid';

import { getDatabase } from "../db"
import { getCampaign } from "../campaign/campaign"
import { GloomhavenError,GloomhavenErrors } from "../errors"
import { GloomhavenPlayer, GloomhavenPlayerAddDto } from './players.types';

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
        ...payload
    }
    player.name = `${player.id} ${player.name}`

    console.log(player);

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
                console.log('Player type already exists : ' , player.character);
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