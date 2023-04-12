export interface GloomhavenCampaign extends GloomhavenCampaignEditDto {
    id: string;
    players: GloomhavenPlayer[];
}
export interface GloomhavenCampaignEditDto extends GloomhavenCampaignAddDto {
    reputation: number;
    townProsperity: number;
    currentScenario: number;
}
export interface GloomhavenCampaignAddDto {
    title: string;
}
export interface GloomhavenPlayer extends GloomhavenPlayerEditDto {
    id: string;
    campaignID: string;
}
export interface GloomhavenPlayerEditDto extends GloomhavenPlayerAddDto {
    level: number;
    xp: number;
    gold: number;
    goldTokens: number;
}
export interface GloomhavenPlayerAddDto {
    name: string;
    character: GloomhavenCharacters;
}
export enum GloomhavenCharacters {
    Brute = "Brute",
    Cragheart = "Cragheart",
    Mindthief = "Mindthief",
    Scoundrel = "Scoundrel",
    Spellweaver = "Spellweaver",
    Tinkerer = "Tinkerer",
    NONE = "NONE"
}
export class GloomhavenError extends Error {
    constructor(message: string);
}
export abstract class PheroService<TContext = {}> {
}
export class gloomhavenService extends PheroService {
    getCampaigns(): Promise<GloomhavenCampaign[]>;
    addCampaign(payload: GloomhavenCampaignAddDto): Promise<GloomhavenCampaign>;
    getCampaign(campaignID: string): Promise<GloomhavenCampaign>;
    deleteCampaign(campaignID: string): Promise<void>;
    updateCampaign(campaignID: string, payload: GloomhavenCampaignEditDto): Promise<GloomhavenCampaign>;
    getPlayersInCampaign(campaignID: string): Promise<GloomhavenPlayer[]>;
    addPlayerToCampaign(campaignID: string, payload: GloomhavenPlayerAddDto): Promise<GloomhavenPlayer>;
    deletePlayer(playerID: string): Promise<boolean>;
    getPlayer(playerID: string): Promise<GloomhavenPlayer>;
    updatePlayer(playerID: string, payload: GloomhavenPlayerEditDto): Promise<GloomhavenPlayer>;
}