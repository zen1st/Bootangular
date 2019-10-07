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
  RouterOutletComponent,
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
  ChatContentComponent,
  BasedChatComponent,
  NewChatModalContainerComponent,
} from './component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
	/*pathMatch:'full'
	
	,children: [
      { path: '', component: LoginComponent, canActivate: [GuestGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [GuestGuard] },
	  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] }
    ]
	*/
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
    path: 'testTable',
    component: TestTableComponent,
	canActivate: [LoginGuard],
	children: [
		{ path: ':action', component: TestTableModalContainerComponent},
		{ path: ':action/:id', component: TestTableModalContainerComponent}
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
	component: RouterOutletComponent,
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
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
