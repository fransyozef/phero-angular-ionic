import { Component, OnInit } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { AlertController, IonRouterOutlet, LoadingController, ModalController, NavController } from '@ionic/angular'
import { GloomhavenCampaign, GloomhavenCampaignAddDto, GloomhavenError } from '../../../phero.generated'
import { GloomhavenService } from '../../_services/gloomhaven.service'

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.page.html',
  styleUrls: ['./campaign-add.page.scss'],
})
export class CampaignAddPage implements OnInit {

  showHomeButton = false
  isSubmitting = false

  itemForm!: UntypedFormGroup;
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
    this.showHomeButton = !this.ionRouterOutlet.canGoBack()
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
      subHeader: 'Campaign has been added',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateRoot(`/campaign/edit/${this.campaign.id}`);
          }
        }
      ]
    });

    await alert.present();
  }

}
