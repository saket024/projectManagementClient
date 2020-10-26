import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'inside',
    loadChildren: () => import('./pages/inside/inside.module').then(m => m.InsidePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then(m => m.EmployeesPageModule),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksPageModule),
  },
  {
    path: 'single-task',
    loadChildren: () => import('./pages/single-task/single-task.module').then(m => m.SingleTaskPageModule)
  },
  {
    path: 'my-tasks',
    loadChildren: () => import('./pages/my-tasks/my-tasks.module').then(m => m.MyTasksPageModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then(m => m.CreatePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
