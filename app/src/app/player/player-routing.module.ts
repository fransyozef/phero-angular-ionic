import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerPage } from './player.page';
import { PlayerEditPage } from './player-edit/player-edit.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/campaign/overview',
    pathMatch: 'full'
  },
  {
    path: 'edit/:id',
    component: PlayerEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerPageRoutingModule { }
