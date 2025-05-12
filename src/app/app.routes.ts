import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './auth/components/register/register.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path: 'admin', loadChildren:()=>import('./admin/admin.module').then(adm=>adm.AdminModule)},
    {path: 'auth', loadChildren:()=>import('./auth/auth.module').then(aut=>aut.AuthModule)},
    
    //{ path: 'auth/forgot-password', component: ForgotPasswordComponent }
    //{path: 'register', loadChildren:()=>import('./auth/).then(reg=>reg.AuthModule)},
    //{ path: 'register', component: RegisterComponent }
    //{ path: 'forgot-password', component: ForgotPasswordComponent }
    //{path: 'utilities', loadChildren: () => import('./utilities/utilities.module').then(m => m.UtilitiesModule)}
];

