import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

// material
import {
  MatIconRegistry
} from '@angular/material';
import { MaterialModule } from "./material.module";
import { FilterItemDirective } from "./filter-item.directive";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { 
  LoginGuard, 
  GuestGuard, 
  AdminGuard 
} from './guard';
import {
  HeaderComponent,
  AccountMenuComponent,
  GithubComponent,
  ApiCardComponent,
  PlaceholderComponent,
  TestCompComponent,
  
  NavComponent,
  
  LandingNavComponent,
  LoginComponent,
  SignupComponent,

  LoggedInNavComponent,
  
  HomeComponent,
  LandingHomeComponent,
  BadTokenComponent,
  VerifyEmailComponent,
  ChangePasswordComponent,
  ResetPasswordComponent,
  NotFoundComponent,
  ForbiddenComponent,
  AuthTestComponent,
  
  LoggedInHomeComponent,
  
  AdminComponent,
  UserTableComponent,
  UserAddDialogComponent,
  UserEditDialogComponent,
  UserDeleteDialogComponent,
  
  ArticleComponent,
  MastheadComponent,
  PostPreviewComponent,
  
  AuthorComponent,
  
  FooterComponent,
  LandingFooterComponent,
  LoggedInFooterComponent
} from './component';


import {
  ApiService,
  ConfigService,
  AuthService,
  UserService,
  FooService,
  ArticleService,
} from './service';

export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApiCardComponent,
    GithubComponent,
    LoginComponent,
    NotFoundComponent,
    AccountMenuComponent,
    ChangePasswordComponent,
    ForbiddenComponent,
    SignupComponent,
    PostPreviewComponent,
    AuthTestComponent,
    ArticleComponent,
    AuthorComponent,
	EscapeHtmlPipe,
	TestCompComponent,
	BadTokenComponent,
	VerifyEmailComponent,
	ResetPasswordComponent,
	FilterItemDirective,
    PlaceholderComponent,
    NavComponent,
    LandingNavComponent,
    LoggedInNavComponent,
	HomeComponent,
	LandingHomeComponent,
	LoggedInHomeComponent,
    MastheadComponent,
	AdminComponent,
	UserTableComponent,
	UserAddDialogComponent,
    UserEditDialogComponent,
    UserDeleteDialogComponent,
	FooterComponent,
    LandingFooterComponent,
    LoggedInFooterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
	MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
	AngularEditorModule,
	RecaptchaModule,
    RecaptchaFormsModule
  ],
  entryComponents: [
    UserAddDialogComponent,
    UserEditDialogComponent,
    UserDeleteDialogComponent
  ],
  providers: [
    LoginGuard,
    GuestGuard,
    AdminGuard,
    FooService,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
	ArticleService,
    MatIconRegistry,
    {
      'provide': APP_INITIALIZER,
      'useFactory': initUserFactory,
      'deps': [UserService],
      'multi': true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
