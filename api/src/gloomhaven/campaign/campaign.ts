import { v4 as uuidv4 } from 'uuid';

import { getDatabase } from "../db"
import { GloomhavenError, GloomhavenErrors } from "../errors"
import { getPlayersInCampaign, deletePlayersFromCompaign } from "../players/players"
import { GloomhavenCampaign, GloomhavenCampaignAddDto, GloomhavenCampaignEditDto } from "./campaign.types"

export async function updateCampaign(campaignID: string, payload: GloomhavenCampaignEditDto): Promise<GloomhavenCampaign> {
    const db = getDatabase()
    const campaign = await getCampaign(campaignID)
    if (!campaign) {
        throw new GloomhavenError(GloomhavenErrors.CAMPAIGN_NOT_FOUND)
    }

    const updatedCampaign: GloomhavenCampaign = { ...campaign, ...payload }
    const indexFound = await db.getIndex("/campaigns", campaignID)
    try {
        await db.delete(`/campaigns[${indexFound}]`)
        await db.reload()
        await db.push("/campaigns[]", updatedCampaign, true);
        return updatedCampaign
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.GENERIC)
    }
}


export async function deleteCampaign(campaignID: string): Promise<void> {
    const db = getDatabase()

    let indexFound = -1
    try {
        indexFound = await db.getIndex("/campaigns", campaignID)
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.CAMPAIGN_NOT_FOUND)
    }

    if (indexFound < 0) {
        throw new GloomhavenError(GloomhavenErrors.CAMPAIGN_NOT_FOUND)
    }

    // Delete the campaign
    try {
        await db.delete(`/campaigns[${indexFound}]`)
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.CAMPAIGN_NOT_FOUND)
    }

    try {
        await db.reload()
        await deletePlayersFromCompaign(campaignID)
    } catch (e) { }

}

export async function getCampaign(campaignID: string): Promise<GloomhavenCampaign> {
    const db = getDatabase()
    try {
        const campaign = await db.find<GloomhavenCampaign>("/campaigns", (campaign: GloomhavenCampaign) => {
            return campaign.id === campaignID
        })
        if (campaign) {
            // now fetch the players
            const players = await getPlayersInCampaign(campaignID)
            if (players) {
                campaign.players = players
            }
            return campaign
        }
    } catch (e) { }

    throw new GloomhavenError(GloomhavenErrors.CAMPAIGN_NOT_FOUND)
}

export async function getCampaigns(): Promise<GloomhavenCampaign[]> {
    const db = getDatabase()
    let campaigns: GloomhavenCampaign[] = []
    try {
        campaigns = await db.getObject<GloomhavenCampaign[]>("/campaigns")
    } catch (e) { }
    return campaigns;
}

export async function addCampaign(payload: GloomhavenCampaignAddDto): Promise<GloomhavenCampaign> {
    const db = getDatabase()
    const campaign: GloomhavenCampaign = {
        id: uuidv4(),
        reputation: 0,
        townProsperity: 0,
        players: [],
        currentScenario: 0,
        ...payload
    }

    try {
        await db.push("/campaigns[]", campaign, true);
        return campaign
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.GENERIC)
    }
}