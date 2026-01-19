import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogIn  } from './log-in/log-in';
import { SignUp } from './sign-up/sign-up';
import {Index} from './index';

export const routes: Routes = [
  { path: 'login', component: LogIn },
  { path: 'sign-up', component: SignUp },
  { path: 'index', component: Index },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
