import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignPage } from './campaign.page';
import { CampaignAddPage } from './campaign-add/campaign-add.page';
import { CampaignEditPage } from './campaign-edit/campaign-edit.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/campaign/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: CampaignPage
  },
  {
    path: 'add',
    component: CampaignAddPage
  },
  {
    path: 'edit/:id',
    component: CampaignEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignPageRoutingModule { }
