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
  BadTokenComponent,
  VerifyEmailComponent,
  ResetPasswordComponent,
  ChangePasswordComponent,
  NotFoundComponent,
  ForbiddenComponent,
  AuthTestComponent,
  AdminComponent,
  UserTableComponent,
  PlaceholderComponent,
  ArticleComponent,
  AuthorComponent,
} from './component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  /*
  {
    path: 'login',
    component: HomeComponent,
	data : {flag : 0}
  },
  {
    path: 'signup',
    component: HomeComponent,
	data : {flag : 1}
  },*/
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
    path: 'authtest',
    component: AuthTestComponent,
    pathMatch: 'full'
  },
  { path: 'admin', 
	component: AdminComponent,
	canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UserTableComponent },
      { path: 'placeholder', component: PlaceholderComponent }
    ]
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'article/:action/:id',
    component: ArticleComponent
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
