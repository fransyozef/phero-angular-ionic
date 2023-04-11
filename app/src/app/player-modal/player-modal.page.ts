import { Component, OnInit } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { ModalController, ActionSheetController } from '@ionic/angular'
import { GloomhavenCharacters, GloomhavenError, GloomhavenPlayerAddDto } from 'src/phero.generated'
import { GloomhavenService } from '../_services/gloomhaven.service'

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.page.html',
  styleUrls: ['./player-modal.page.scss'],
})
export class PlayerModalPage implements OnInit {

  campaignID = ""

  item: GloomhavenPlayerAddDto = {
    name: '',
    level: 0,
    xp: 0,
    gold: 0,
    goldTokens: 0,
    character: GloomhavenCharacters.Brute
  }

  isSubmitting = false
  itemForm!: UntypedFormGroup

  gloomhavenCharacters: string[] = []

  constructor(
    private modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private gloomhavenService: GloomhavenService,
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.itemForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.item.name, Validators.required),
      character: new UntypedFormControl(this.item.character, Validators.required)
    });
    this.gloomhavenCharacters = Object.keys(GloomhavenCharacters)
  }

  async done() {
    await this.modalController.dismiss({

    });
  }

  async submit() {
    if (this.itemForm.valid) {
      const payload: GloomhavenPlayerAddDto = { ...this.item, ...this.itemForm.value }

      try {
        const result = await this.gloomhavenService.addPlayerToCampaign(this.campaignID, payload)
        await this.modalController.dismiss({
          player: result
        })
      } catch (e) {
        if (e instanceof GloomhavenError) {
          alert(e.message)
        } else {
          console.log(e)
        }
      }
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
