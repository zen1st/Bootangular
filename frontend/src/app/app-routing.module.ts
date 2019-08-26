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
  LoginComponent,
  SignupComponent,
  BadTokenComponent,
  ResetPasswordComponent,
  ChangePasswordComponent,
  NotFoundComponent,
  ForbiddenComponent,
  AuthTestComponent,
  AdminComponent,
  UserTableComponent,
  PlaceholderComponent,
  TestTableComponent,
  TestTableModalContainerComponent,
  TestTableModalComponent,
  CleanBlogContentComponent,
  ChatContentComponent
} from './component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //pathMatch: 'full',
	children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] }
    ]
  },
  /*{
    path: 'login',
    component: HomeComponent
	//data : {flg : 0}
  },
  {
    path: 'signup',
    component: HomeComponent
	//data : {flg : 1}
  },
  /*
  {
    path: 'verifyEmail/:token',
    component: VerifyEmailComponent,
    canActivate: [GuestGuard]
  },*/
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
    path: 'testTable',
    component: TestTableComponent,
	canActivate: [LoginGuard],
	children: [
		{ path: ':action', component: TestTableModalContainerComponent,  outlet: 'modal'},
		{ path: ':action/:id', component: TestTableModalContainerComponent,  outlet: 'modal'}
    ]
  },
  {
    path: 'blogs',
    component: CleanBlogContentComponent
  },
  {
    path: 'blogs/:action',
    component: CleanBlogContentComponent,
	canActivate: [LoginGuard]
  },
  {
    path: 'blogs/:action/:id',
    component: CleanBlogContentComponent
  },
  {
    path: 'chats',
    component: ChatContentComponent,
	canActivate: [LoginGuard]
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
