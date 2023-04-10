import { Injectable } from '@angular/core';


import { PheroClient, GloomhavenCampaign, GloomhavenCampaignAddDto, GloomhavenPlayer, GloomhavenPlayerAddDto, GloomhavenCharacters } from "../../phero.generated";
const fetch = window.fetch.bind(this);
const pheroClient = new PheroClient(fetch);

@Injectable({
  providedIn: 'root'
})
export class GloomhavenService {

  constructor() { }

  async dummy(): Promise<GloomhavenPlayer[]> {
    return await pheroClient.gloomhavenService.getPlayersInCampaign("1e79b4be-f5ba-4bac-a406-bb72411c6984")
  }

  async getPlayersInCampaign(campaignID : string): Promise<GloomhavenPlayer[]> {
    return await pheroClient.gloomhavenService.getPlayersInCampaign(campaignID)
  }

  async addPlayerToCampaign(campaignID : string , payload:GloomhavenPlayerAddDto): Promise<GloomhavenPlayer> {
    return await pheroClient.gloomhavenService.addPlayerToCampaign(campaignID,payload)
  }

  async getCampaign(campaignID: string): Promise<GloomhavenCampaign> {
    return await pheroClient.gloomhavenService.getCampaign(campaignID)
  }

  async getCampaigns(): Promise<GloomhavenCampaign[]> {
    return await pheroClient.gloomhavenService.getCampaigns()
  }

  async addCampaign(payload:GloomhavenCampaignAddDto): Promise<GloomhavenCampaign> {
    return await pheroClient.gloomhavenService.addCampaign(payload)
  }


}
