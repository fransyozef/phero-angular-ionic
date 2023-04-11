import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignEditPageRoutingModule } from './campaign-edit-routing.module';

import { CampaignEditPage } from './campaign-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignEditPageRoutingModule
  ],
  declarations: [CampaignEditPage]
})
export class CampaignEditPageModule {}
