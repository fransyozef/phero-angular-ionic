import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignPage } from './campaign.page';
import { CampaignAddPage } from './campaign-add/campaign-add.page';

const routes: Routes = [
  {
    path: 'overview',
    component: CampaignPage
  },
  {
    path: 'add',
    component: CampaignAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignPageRoutingModule {}
