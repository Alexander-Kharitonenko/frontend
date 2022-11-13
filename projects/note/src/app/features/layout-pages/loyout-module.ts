import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AthenticationComponent } from 'projects/business/src/lib/features/dialogs/athentication/login/athentication.component';
import { RegisterComponent } from 'projects/business/src/lib/features/dialogs/athentication/register/register.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { LoyoutLocalRouterModule } from './loyout-router.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmptyHomeComponent } from './empty-home/empty-home.component';

@NgModule({
  declarations: [
    EmptyLayoutComponent,
    EmptyHomeComponent,
    NotFoundComponent,
    RegisterComponent,
    AthenticationComponent,
  ],
  imports: [
    LoyoutLocalRouterModule,
    MaterialModule,
    FormlyModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
  ],

  providers: [],
})
export class LoyoutModule {}
