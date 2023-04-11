import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerModalPage } from './player-modal.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        PlayerModalPage
    ],
    providers: [
    ]
})
export class PlayerModalPageModule {}
