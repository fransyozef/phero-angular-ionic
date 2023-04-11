import { GloomhavenPlayer } from "../players/players.types"

export interface GloomhavenCampaignAddDto {
  title: string
}

export interface GloomhavenCampaignEditDto extends GloomhavenCampaignAddDto {
  reputation: number
  townProsperity: number
  currentScenario: number
}

export interface GloomhavenCampaign extends GloomhavenCampaignEditDto {
  id: string
  players: GloomhavenPlayer[]
}


export class GloomhavenPartyError extends Error {
  constructor() {
    super(`Party not found`)
  }
}
