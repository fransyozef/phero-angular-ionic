import { GloomhavenCharacters } from "../characters"

export interface GloomhavenPlayerAddDto {
  name: string
  level: number
  xp: number
  gold: number
  goldTokens: number,
  character: GloomhavenCharacters
}

export interface GloomhavenPlayer extends GloomhavenPlayerAddDto {
  id: string
  campaignID: string
}

export class GloomhavenPlayerError extends Error {
  constructor() {
    super(`Player not found`)
  }
}
