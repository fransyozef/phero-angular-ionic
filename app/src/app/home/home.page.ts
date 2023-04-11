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


}
