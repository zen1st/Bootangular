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

  PlaceholderComponent,
  TestCompComponent,

  LoginComponent,
  SignupComponent,

  BadTokenComponent,
  ChangePasswordComponent,
  ResetPasswordComponent,
  NotFoundComponent,
  ForbiddenComponent,
  ApiCardComponent,
  AuthTestComponent,
  
  HomeComponent,
  RouterOutletComponent,

  AdminComponent,
  UserTableComponent,
  UserAddDialogComponent,
  UserEditDialogComponent,
  UserDeleteDialogComponent,
  
  NewAgeComponent,
  NewAgeNavComponent,
  NewAgeContentComponent,
  NewAgeFooterComponent,
  
  CleanBlogComponent,
  CleanBlogNavComponent,
  CleanBlogContentComponent,
  CleanBlogMastheadComponent,
  CleanBlogPreviewComponent,
  CleanBlogFooterComponent,
  
  ChatComponent,
  ChatNavComponent,
  ChatContentComponent,
  ChatFooterComponent
} from './component';

import {
  ApiService,
  ConfigService,
  AuthService,
  UserService,
  FooService,
  BlogService,
} from './service';

export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}

@NgModule({
  declarations: [
    AppComponent,
    ApiCardComponent,
    LoginComponent,
    NotFoundComponent,
    ChangePasswordComponent,
    ForbiddenComponent,
    SignupComponent,
    CleanBlogPreviewComponent,
    AuthTestComponent,
    CleanBlogContentComponent,
	EscapeHtmlPipe,
	TestCompComponent,
	BadTokenComponent,
	ResetPasswordComponent,
	FilterItemDirective,
    PlaceholderComponent,
	HomeComponent,
    CleanBlogMastheadComponent,
	AdminComponent,
	UserTableComponent,
	UserAddDialogComponent,
    UserEditDialogComponent,
    UserDeleteDialogComponent,
    CleanBlogComponent,
    CleanBlogNavComponent,
    CleanBlogFooterComponent,
    NewAgeComponent,
    NewAgeFooterComponent,
    NewAgeNavComponent,
    NewAgeContentComponent,
    RouterOutletComponent,
    ChatComponent,
    ChatNavComponent,
    ChatContentComponent,
    ChatFooterComponent,
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
	BlogService,
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
