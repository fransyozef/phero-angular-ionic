import { GloomhavenCharacters } from "../characters"

export interface GloomhavenPlayerAddDto {
  name: string
  character: GloomhavenCharacters
}

export interface GloomhavenPlayerEditDto extends GloomhavenPlayerAddDto {
  level: number
  xp: number
  gold: number
  goldTokens: number
}

export interface GloomhavenPlayer extends GloomhavenPlayerEditDto {
  id: string
  campaignID: string
}
