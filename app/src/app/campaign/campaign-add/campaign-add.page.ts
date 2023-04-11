import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, IonRouterOutlet, LoadingController, ModalController, NavController } from '@ionic/angular';
import { GloomhavenService } from 'src/app/_services/gloomhaven.service';
import { GloomhavenCampaign, GloomhavenCampaignAddDto, GloomhavenError } from 'src/phero.generated';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.page.html',
  styleUrls: ['./campaign-add.page.scss'],
})
export class CampaignAddPage implements OnInit {

  itemForm!: UntypedFormGroup;

  isSubmitting = false

  item: GloomhavenCampaignAddDto = {
    title: ''
  };

  campaign!: GloomhavenCampaign;

  constructor(    
    private ionRouterOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private gloomhavenService: GloomhavenService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required)
    });
  }

  async submit() {
    this.isSubmitting = true;
      try {
        const campaign = await this.gloomhavenService.addCampaign(this.itemForm.value);
        this.campaign = campaign
        await this.presentSuccess()
      } catch (e) {
        if (e instanceof GloomhavenError) {
          alert(e.message)
        } else {
          console.log(e)
        }
      }
      this.isSubmitting = false;
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader : 'Campaign has been added',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateBack(`/campaign/edit/${this.campaign.id}`);
          }
        }
      ]
    });

    await alert.present();
  }

}
