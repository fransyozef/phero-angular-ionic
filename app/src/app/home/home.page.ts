import { Component, OnInit } from '@angular/core';
import { GloomhavenCampaign, GloomhavenCampaignAddDto, GloomhavenCharacters, GloomhavenPlayerAddDto, GloomhavenError } from "../../phero.generated";
import { GloomhavenService } from '../_services/gloomhaven.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  campaigns: GloomhavenCampaign[] = [];

  constructor(
    private gloomhavenService: GloomhavenService
  ) { }

  ngOnInit(): void {
    this.getCampaigns()
  }


  async getCampaign() {
    const campaignID = "1e79b4be-f5ba-4bac-a406-bb72411c6984"
    try {
      const campaign = await this.gloomhavenService.getCampaign(campaignID)
      console.log(campaign)
    } catch (e) {
      if (e instanceof GloomhavenError) {
        alert(e.message)
      } else {
        console.log(e)
      }
    }
  }

  async getCampaigns() {
    try {
      const campaigns = await this.gloomhavenService.getCampaigns()
      console.log(campaigns);
      this.campaigns = campaigns;
    } catch (e) {
      console.log("Something went wrong");
    }
  }

  async addCampaign() {
    try {
      const payload: GloomhavenCampaignAddDto = {
        title: 'blaaaat'
      }
      const article = await this.gloomhavenService.addCampaign(payload);
      console.log(article);
    } catch (e) {
      if (e instanceof GloomhavenError) {
        alert(e.message)
      } else {
        console.log(e)
      }
    }
  }

  async addPlayerToCampaign() {
    const campaignID = "1e79b4be-f5ba-4bac-a406-bb72411c6984"
    try {

      const payload: GloomhavenPlayerAddDto = {
        name: 'Player',
        level: 0,
        xp: 0,
        gold: 0,
        goldTokens: 0,
        character: GloomhavenCharacters.Tinkerer
      }
      const returnValue = await this.gloomhavenService.addPlayerToCampaign(campaignID, payload)
    } catch (e) {
      if (e instanceof GloomhavenError) {
        alert(e.message)
      } else {
        console.log(e)
      }
    }
  }

  async deleteCampaign() {
    const campaignID = "96da1218-e72a-47ae-ad28-9f956991dd14"
    try {
      const returnValue = await this.gloomhavenService.deleteCampaign(campaignID)
    } catch (e) {
      if (e instanceof GloomhavenError) {
        alert(e.message)
      } else {
        console.log(e)
      }
    }

    this.campaigns = []
    await this.getCampaigns()
  }

}
