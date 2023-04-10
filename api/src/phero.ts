import { createService } from '@phero/server'


import * as gloomhavenCampaignFunctions from "./gloomhaven/campaign/campaign"
import * as gloomhavenPlayerFunctions from "./gloomhaven/players/players"

export const gloomhavenService = createService({
  getCampaigns : gloomhavenCampaignFunctions.getCampaigns,
  addCampaign: gloomhavenCampaignFunctions.addCampaign,
  getCampaign: gloomhavenCampaignFunctions.getCampaign,
  getPlayersInCampaign: gloomhavenPlayerFunctions.getPlayersInCampaign,
  addPlayerToCampaign: gloomhavenPlayerFunctions.addPlayerToCampaign
})

