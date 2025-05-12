import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

//import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
 
  {
    path:'**',
    redirectTo:'login'
  },

  { path: "forgot-password", 
    component: ForgotPasswordComponent },

  { path: '**', 
    redirectTo: 'forgot-password' }, // Redirigir si no encuentra otra ruta

  { path: 'reset-password', 
    component: ResetPasswordComponent },
  { path: '**', 
    redirectTo: 'reset-password' } // Redirigir si no encuentra otra ruta

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
