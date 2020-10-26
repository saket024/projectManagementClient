import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTasksPage } from './my-tasks.page';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MyTasksPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTasksPageRoutingModule { }
