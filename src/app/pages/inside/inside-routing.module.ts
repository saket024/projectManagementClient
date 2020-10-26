import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsidePage } from './inside.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: InsidePage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'employees',
        loadChildren: () => import('../employees/employees.module').then(m => m.EmployeesPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'tasks',
        loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'create',
        loadChildren: () => import('../create/create.module').then(m => m.CreatePageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'inside',
        redirectTo: 'inside/tasks'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsidePageRoutingModule { }
