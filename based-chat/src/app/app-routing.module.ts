import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  LoginGuard,
  GuestGuard,
  AdminGuard
} from './guard';

import {
  //AppComponent,
  PlaceholderComponent,
  RouterOutletComponent,
  HomeComponent,
  LoginComponent,
  SignupComponent,
  BadEmailVerficationTokenComponent,
  ResetPasswordComponent,
  ChangePasswordComponent,
  NotFoundComponent,
  ForbiddenComponent,
  AdminComponent,
  UserTableComponent,
  NewChatModalContainerComponent,
} from './component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'badToken',
    component: BadEmailVerficationTokenComponent,
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
    path: 'chats',
	component: RouterOutletComponent,
	canActivate: [LoginGuard],
	children: [
		{ path: ':action', component: NewChatModalContainerComponent}
    ]
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
