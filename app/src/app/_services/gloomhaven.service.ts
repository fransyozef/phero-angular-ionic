import { Injectable } from '@angular/core';


import { PheroClient, GloomhavenCampaign, GloomhavenCampaignAddDto, GloomhavenPlayer, GloomhavenPlayerAddDto, GloomhavenCharacters, GloomhavenCampaignEditDto } from "../../phero.generated";
const fetch = window.fetch.bind(this);
const pheroClient = new PheroClient(fetch);

@Injectable({
  providedIn: 'root'
})
export class GloomhavenService {

  constructor() { }

  async deletePlayer(playerID : string): Promise<boolean> {
    return await pheroClient.gloomhavenService.deletePlayer(playerID)
  }

  async getPlayersInCampaign(campaignID : string): Promise<GloomhavenPlayer[]> {
    return await pheroClient.gloomhavenService.getPlayersInCampaign(campaignID)
  }

  async addPlayerToCampaign(campaignID : string , payload:GloomhavenPlayerAddDto): Promise<GloomhavenPlayer> {
    return await pheroClient.gloomhavenService.addPlayerToCampaign(campaignID,payload)
  }

  async updateCampaign(campaignID: string,payload:GloomhavenCampaignEditDto): Promise<GloomhavenCampaign> {
    return await pheroClient.gloomhavenService.updateCampaign(campaignID,payload)
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

  async deleteCampaign(campaignID:string): Promise<boolean> {
    return await pheroClient.gloomhavenService.deleteCampaign(campaignID)
  }


}
