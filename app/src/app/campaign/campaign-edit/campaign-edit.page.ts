import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, NavController } from '@ionic/angular';
import { GloomhavenService } from 'src/app/_services/gloomhaven.service';
import { GloomhavenCampaign, GloomhavenError } from 'src/phero.generated';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.page.html',
  styleUrls: ['./campaign-edit.page.scss'],
})
export class CampaignEditPage implements OnInit {

  campaignID!: string;
  campaign!: GloomhavenCampaign;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private ionRouterOutlet: IonRouterOutlet,
    public alertController: AlertController,
    private gloomhavenService: GloomhavenService,    
  ) { }

  ngOnInit() {
    this.resolveRoute()
  }

  resolveRoute() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      if (params['id']) {
        // tslint:disable-next-line:no-string-literal
        this.campaignID = params['id'];
        this.getItem();
      } else {
        this.navCtrl.navigateRoot('/');
      }
    });
  }

  async getItem() {
      try {
        const campaign = await this.gloomhavenService.getCampaign(this.campaignID)
        console.log(campaign)
      } catch (e) {
        if (e instanceof GloomhavenError) {
          alert(e.message)
          this.navCtrl.navigateRoot('/');
        } else {
          console.log(e)
          this.navCtrl.navigateRoot('/');
        }
      }
    
  }

}
