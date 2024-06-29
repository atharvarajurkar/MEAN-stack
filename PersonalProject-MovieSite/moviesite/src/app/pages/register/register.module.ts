import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Step3Component } from './step3/step3.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      { path: 'step1', component: Step1Component },
      { path: 'step2', component: Step2Component },
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    RegisterComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModule { }
