import { v4 as uuidv4 } from 'uuid';

import { getDatabase } from "../db"
import { GloomhavenError,GloomhavenErrors } from "../errors"
import { getPlayersInCampaign } from "../players/players"
import { GloomhavenCampaign, GloomhavenCampaignAddDto, GloomhavenPartyError } from "./campaign.types"

export async function getCampaign(campaignID:string): Promise<GloomhavenCampaign> {
    const db = getDatabase()
    try {
        const campaign = await db.find<GloomhavenCampaign>("/campaigns", (campaign:GloomhavenCampaign) => {
            return campaign.id === campaignID
        })
        if(campaign) {
            // now fetch the players
            const players = await getPlayersInCampaign(campaignID)
            if(players) {
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
    console.log(campaigns);
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
    campaign.title = `${campaign.id} ${campaign.title}`

    try {
        await db.push("/campaigns[]", campaign, true);
        console.log(campaign);
        return campaign
    } catch (e) {
        throw new GloomhavenError(GloomhavenErrors.GENERIC)
    }
}