import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { GloomhavenService } from 'src/app/_services/gloomhaven.service';
import { PlayerModalPage } from 'src/app/player-modal/player-modal.page';
import { GloomhavenCampaign, GloomhavenCampaignEditDto, GloomhavenError } from 'src/phero.generated';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.page.html',
  styleUrls: ['./campaign-edit.page.scss'],
})
export class CampaignEditPage implements OnInit {

  campaignID!: string;
  campaign!: GloomhavenCampaign;

  isSubmitting = false
  itemForm!: UntypedFormGroup

  item: GloomhavenCampaignEditDto = {
    title: '',
    reputation: 0,
    townProsperity: 0,
    currentScenario: 0
  };

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private ionRouterOutlet: IonRouterOutlet,
    public alertController: AlertController,
    private gloomhavenService: GloomhavenService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.initForm()
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
      // console.log(campaign)
      this.campaign = campaign

      // we only need the rest key properties
      const { id, players, ...rest } = campaign;
      this.item = rest
  
      // console.log(this.item)
    
    } catch (e) {
      if (e instanceof GloomhavenError) {
        alert(e.message)
      } else {
        console.log(e)
      }
      this.navCtrl.navigateRoot('/');
    }
  }

  initForm() {
    this.itemForm = new UntypedFormGroup({
      title: new UntypedFormControl(this.item.title, Validators.required),
      reputation: new UntypedFormControl(this.item.reputation, Validators.required),
      townProsperity: new UntypedFormControl(this.item.townProsperity, Validators.required),
      currentScenario: new UntypedFormControl(this.item.currentScenario, Validators.required),
    });
  }

  async submit() {
    if(this.itemForm.valid) {
      console.log(this.itemForm.value)
      try {
        const result = await this.gloomhavenService.updateCampaign(this.campaignID,this.itemForm.value)
        await this.presentSuccess()
      } catch(e) {
        if (e instanceof GloomhavenError) {
          alert(e.message)
        } else {
          console.log(e)
        }
      }
    }
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader : 'Campaign has been edited',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateBack('/');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentPlayerDeleteSuccess() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader : 'Player has been removed from the campaign',
      buttons: [
        {
          text: 'Okay'
        }
      ]
    });
    await alert.present();
  }

  async addPlayer() {
    await this.presentMapModal()
  }


  async presentMapModal() {

    const modal = await this.modalController.create({
      component: PlayerModalPage,
      componentProps: { 
        campaignID : this.campaignID
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    // tslint:disable-next-line:no-string-literal
    if (data && data.player) {
      this.campaign.players.push(data.player)
    }
  }

  async deletePlayer(playerID:string) {
    try {
      const result = await this.gloomhavenService.deletePlayer(playerID)
      if(result === true) {
        await this.presentPlayerDeleteSuccess()
        await this.getItem()
      }
    } catch (e) {
      if (e instanceof GloomhavenError) {
        alert(e.message)
      } else {
        console.log(e)
      }
    }
  }

}
