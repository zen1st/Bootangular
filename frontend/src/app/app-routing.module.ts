import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { 
  LoginGuard,
  GuestGuard,
  AdminGuard
} from './guard';
import {
  //AppComponent,
  HomeComponent,
  NotFoundComponent,
  ChangePasswordComponent,
  ForbiddenComponent,
  AdminComponent,
  AuthTestComponent,
  ArticleComponent,
  AuthorComponent,
  BadTokenComponent,
  VerifyEmailComponent,
  ResetPasswordComponent
} from './page';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'verifyEmail/:token',
    component: VerifyEmailComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'badToken',
    component: BadTokenComponent,
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
