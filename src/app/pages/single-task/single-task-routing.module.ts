import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleTaskPage } from './single-task.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleTaskPageRoutingModule {}
