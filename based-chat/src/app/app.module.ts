import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from "./material/material.module";
import { MatIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { FilterItemDirective } from "./filter-item.directive";

import { AppComponent } from './app.component';

import { 
	PlaceholderComponent,
	RouterOutletComponent,
	//NavComponent,
	HomeComponent,
	LandingPageComponent,
	LoginComponent,
	ResetPasswordComponent,
	SignupComponent,
	BadEmailVerficationTokenComponent,
	ChangePasswordComponent,
	ForbiddenComponent,
	NotFoundComponent,
	AdminComponent,
	UserTableComponent,
	UserTableUnableComponent,
	UserTableDisableComponent,
	ChatComponent,
	ChatNavComponent,
	ChatContentComponent,
	ChatMessagesComponent,
	ChatFooterComponent,
	NewChatModalContainerComponent,
	NewChatModalComponent,
	ChatConfirmDialogComponent,
	ChatEditDialogComponent
	
}from './component';

import {
	ApiService,
	ConfigService,
	AuthService,
	UserService,
	ChatRoomService,
	LeftSideNavService,
	RightSideNavService
} from './service';
import {CookieService} from 'ngx-cookie-service';

import { 
	LoginGuard, 
	GuestGuard, 
	AdminGuard 
} from './guard';

import { 
	ScrollableDirective, 
	OffsetTopDirective 
} from './directive';

export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}

@NgModule({
  declarations: [
  	EscapeHtmlPipe,
	FilterItemDirective,
    AppComponent,
	PlaceholderComponent,
	//NavComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    ForbiddenComponent,
    NotFoundComponent,
    BadEmailVerficationTokenComponent,
    AdminComponent,
    UserTableComponent,
	UserTableUnableComponent,
	UserTableDisableComponent,
	RouterOutletComponent,
	ChatComponent,
    ChatNavComponent,
    ChatContentComponent,
    ChatFooterComponent,
	NewChatModalContainerComponent,
    NewChatModalComponent,
    ChatMessagesComponent,
    ScrollableDirective,
    OffsetTopDirective,
    ChatConfirmDialogComponent,
    ChatEditDialogComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
    HttpClientModule,
    AppRoutingModule,
	FormsModule,  
	ReactiveFormsModule,
	MaterialModule,
	FlexLayoutModule,
    BrowserAnimationsModule,
	RecaptchaModule,
    RecaptchaFormsModule
  ],
  entryComponents: [
	UserTableDisableComponent,
    UserTableUnableComponent,
	NewChatModalComponent,
	ChatConfirmDialogComponent,
	ChatEditDialogComponent
  ],
  providers: [
	MatIconRegistry,
	CookieService,
	ApiService,
	AuthService,
	UserService,
	ChatRoomService,
	LeftSideNavService,
	RightSideNavService,
	GuestGuard,
	LoginGuard,
    AdminGuard,
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
