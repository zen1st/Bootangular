import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

// material
import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatInputModule,
  MatIconRegistry,
  MatProgressSpinnerModule
} from '@angular/material';
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
  AccountMenuComponent,
  HeaderComponent,
  ApiCardComponent,
  FooterComponent,
  GithubComponent,
  PostPreviewComponent,
  TestCompComponent,
  PageHeaderComponent,
  LoginComponent,
  SignupComponent
} from './component';
import {
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
import {
  ApiService,
  AuthService,
  UserService,
  FooService,
  ConfigService,
  ArticleService
} from './service';
export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ApiCardComponent,
    HomeComponent,
    GithubComponent,
    LoginComponent,
    NotFoundComponent,
    AccountMenuComponent,
    ChangePasswordComponent,
    ForbiddenComponent,
    AdminComponent,
    SignupComponent,
    PostPreviewComponent,
    AuthTestComponent,
    ArticleComponent,
    PageHeaderComponent,
    AuthorComponent,
	EscapeHtmlPipe,
	TestCompComponent,
	BadTokenComponent,
	VerifyEmailComponent,
	ResetPasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
	FroalaEditorModule.forRoot(), 
	FroalaViewModule.forRoot()
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
