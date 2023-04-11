import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignPageRoutingModule } from './campaign-routing.module';

import { CampaignPage } from './campaign.page';
import { CampaignAddPage } from './campaign-add/campaign-add.page';
import { CampaignEditPage } from './campaign-edit/campaign-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    CampaignPage,
    CampaignAddPage,
    CampaignEditPage
  ]
})
export class CampaignPageModule {}
