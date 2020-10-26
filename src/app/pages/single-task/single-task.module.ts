import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTaskPageRoutingModule } from './single-task-routing.module';

import { SingleTaskPage } from './single-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleTaskPageRoutingModule
  ],
  declarations: [SingleTaskPage]
})
export class SingleTaskPageModule {}
