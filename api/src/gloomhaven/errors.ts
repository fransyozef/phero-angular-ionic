export enum GloomhavenErrors {
    GENERIC = "Whoops something went wrong",
    CAMPAIGN_NOT_FOUND = "Campaign was not found",
    MAX_PLAYERS_EXCEEDED = "Only max players of 4 is allowed",
    PLAYER_TYPE_ALREADY_IN_CAMPAIGN = "You already have this type of character in your campaign"
}


export class GloomhavenError extends Error {
    constructor(public message: string) {
        super(message)
    }
}