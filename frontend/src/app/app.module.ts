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
//import { HomeComponent } from './home';
//import { LoginComponent } from './login';
import { LoginGuard, GuestGuard, AdminGuard } from './guard';
//import { NotFoundComponent } from './not-found';
import { AccountMenuComponent } from './component/header/account-menu/account-menu.component';
import {
  //AccountMenuComponent,
  HeaderComponent,
  ApiCardComponent,
  FooterComponent,
  GithubComponent,
  PostPreviewComponent,
  TestCompComponent,
  PageHeaderComponent
} from './component';
import {
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
} from './page';
import {
  ApiService,
  AuthService,
  UserService,
  FooService,
  ConfigService,
  ArticleService
} from './service';
/*
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { AuthTestComponent } from './auth-test/auth-test.component';
import { ArticleComponent } from './article/article.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AuthorComponent } from './author/author.component';
import { TestCompComponent } from './test-comp/test-comp.component';
*/
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
	TestCompComponent
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
