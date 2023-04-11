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
export interface GloomhavenPlayer extends GloomhavenPlayerAddDto {
    id: string;
    campaignID: string;
}
export interface GloomhavenPlayerAddDto {
    name: string;
    level: number;
    xp: number;
    gold: number;
    goldTokens: number;
    character: GloomhavenCharacters;
}
export enum GloomhavenCharacters {
    Brute = "Brute",
    Cragheart = "Cragheart",
    Mindthief = "Mindthief",
    Scoundrel = "Scoundrel",
    Spellweaver = "Spellweaver",
    Tinkerer = "Tinkerer"
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
    deleteCampaign(campaignID: string): Promise<boolean>;
    updateCampaign(campaignID: string, payload: GloomhavenCampaignEditDto): Promise<GloomhavenCampaign>;
    getPlayersInCampaign(campaignID: string): Promise<GloomhavenPlayer[]>;
    addPlayerToCampaign(campaignID: string, payload: GloomhavenPlayerAddDto): Promise<GloomhavenPlayer>;
    deletePlayer(playerID: string): Promise<boolean>;
}