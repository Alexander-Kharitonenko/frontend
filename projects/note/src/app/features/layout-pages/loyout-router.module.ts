import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthenticationComponent } from 'projects/business/src/lib/features/dialogs/athentication/login/athentication.component';
import { RegisterComponent } from 'projects/business/src/lib/features/dialogs/athentication/register/register.component';
import { EmptyHomeComponent } from './empty-home/empty-home.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';

const routes: Routes = [
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        component: EmptyHomeComponent,
      },
      {
        path: 'login',
        component: AthenticationComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyoutLocalRouterModule {}
