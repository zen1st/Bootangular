import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
/*
import { HomeComponent } from './home';
import { AuthTestComponent } from './auth-test';
import { LoginComponent } from './login';
import { AdminComponent } from './admin';
import { LoginGuard } from './guard';

import { 
  LoginGuard,
  GuestGuard,
  AdminGuard
} from './guard';

import { NotFoundComponent } from './not-found';
import { ChangePasswordComponent } from './change-password';
import { ForbiddenComponent } from './forbidden';
import { SignupComponent } from './signup';
import { ArticleComponent } from './article';*/

import { 
  LoginGuard,
  GuestGuard,
  AdminGuard
} from './guard';

import {
  //AppComponent,
  HomeComponent,
  LoginComponent,
  NotFoundComponent,
  ChangePasswordComponent,
  ForbiddenComponent,
  AdminComponent,
  SignupComponent,
  AuthTestComponent,
  ArticleComponent,
  AuthorComponent,
  BadUserComponent
} from './page';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'signup',
    component: SignupComponent,
    canActivate: [GuestGuard],
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'verifyEmail/:token',
    component: VerifyEmailComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'badUser',
    component: BadUserComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
	canActivate: [GuestGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'authtest',
    component: AuthTestComponent,
    pathMatch: 'full'
  },
  {
    path: 'article/:action',
    component: ArticleComponent,
	canActivate: [LoginGuard]
  },
  {
    path: 'article/:action/:id',
    component: ArticleComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
