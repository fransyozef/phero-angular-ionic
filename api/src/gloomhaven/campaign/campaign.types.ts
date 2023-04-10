import { GloomhavenPlayer } from "../players/players.types"

export interface GloomhavenCampaignAddDto {
  title: string
}

export interface GloomhavenCampaign extends GloomhavenCampaignAddDto {
  id: string
  reputation: number
  townProsperity: number
  players: GloomhavenPlayer[]
  currentScenario: number
}

export class GloomhavenPartyError extends Error {
  constructor() {
    super(`Party not found`)
  }
}
