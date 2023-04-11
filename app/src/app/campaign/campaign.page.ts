import { Component, OnInit } from '@angular/core'
import { AlertController, LoadingController, ModalController } from '@ionic/angular'
import { GloomhavenCampaign, GloomhavenError } from "../../phero.generated"
import { GloomhavenService } from '../_services/gloomhaven.service'

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
})
export class CampaignPage implements OnInit {

  campaigns: GloomhavenCampaign[] = [];

  constructor(
    private gloomhavenService: GloomhavenService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public modalController: ModalController,
  ) { }

  ngOnInit(): void {
    this.getCampaigns()
  }

  async getCampaigns() {
    this.campaigns = []
    try {
      const campaigns = await this.gloomhavenService.getCampaigns()
      this.campaigns = campaigns;
      console.log(this.campaigns)
    } catch (e) {
      alert("Something went wrong");
    }
  }

  async deleteCampaign(campaignID:string) {
    try {
      await this.gloomhavenService.deleteCampaign(campaignID)
      await this.presentDeleteCampaignSuccess()
    } catch (e) {
      if (e instanceof GloomhavenError) {
        alert(e.message)
      } else {
        console.log(e)
      }
    }
  }

  async presentDeleteCampaignSuccess() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader : 'Campaign has been deleted',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            await this.getCampaigns()
          }
        }
      ]
    });

    await alert.present();
  }


}
