import { Component, OnInit } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AlertController, IonRouterOutlet, ModalController, NavController } from '@ionic/angular'
import { GloomhavenService } from 'src/app/_services/gloomhaven.service'
import { GloomhavenCharacters, GloomhavenError, GloomhavenPlayer, GloomhavenPlayerEditDto } from 'src/phero.generated'

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.page.html',
  styleUrls: ['./player-edit.page.scss'],
})
export class PlayerEditPage implements OnInit {

  showHomeButton = false
  isSubmitting = false

  playerID = ""

  player!: GloomhavenPlayer

  itemForm!: UntypedFormGroup
  item: GloomhavenPlayerEditDto = {
    name: '',
    level: 0,
    xp: 0,
    gold: 0,
    goldTokens: 0,
    character: GloomhavenCharacters.NONE
  }

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
        this.playerID = params['id']
        this.getItem()
        this.showHomeButton = !this.ionRouterOutlet.canGoBack()
      } else {
        this.navCtrl.navigateRoot('/')
      }
    });
  }

  async getItem() {
    try {
      const player = await this.gloomhavenService.getPlayer(this.playerID)
      // console.log(campaign)
      this.player = player

      console.log(this.player)

      // we only need the rest key properties
      const { id, ...rest } = player;
      this.item = rest

      console.log(this.item)

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
      name: new UntypedFormControl(this.item.name, Validators.required),
      level: new UntypedFormControl(this.item.level, Validators.required),
      xp: new UntypedFormControl(this.item.xp, Validators.required),
      gold: new UntypedFormControl(this.item.gold, Validators.required),
      goldTokens: new UntypedFormControl(this.item.goldTokens, Validators.required)
    });
  }

  async submit() {
    if (this.itemForm.valid) {
      try {
        const payload: GloomhavenPlayerEditDto = { ...this.player, ...this.itemForm.value }
        const result = await this.gloomhavenService.updatePlayer(this.playerID, payload)
        await this.presentSuccess()
      } catch (e) {
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
      subHeader: 'Player has been updated',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateBack(`/campaign/edit/${this.player.campaignID}`);
          }
        }
      ]
    });
    await alert.present();
  }


}
