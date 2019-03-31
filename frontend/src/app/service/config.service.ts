import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  private _api_url = '/api'
  
  private _foo_url = this._api_url + '/foo';

  private _auth_url = this._api_url + '/auth';

  private _signup_url = this._auth_url + '/signup';
   
  private _login_url = this._auth_url + '/login';

  private _logout_url = this._auth_url + '/logout';
  
  private _verify_email_url = this._auth_url + '/verifyEmail';

  private _resend_email_verification_url = this._auth_url + '/resendEmailVerification';
  
  private _refresh_token_url = this._auth_url + '/refreshAuthToken';
  
  private _change_password_url = this._api_url + '/changePassword';

  private _whoami_url = this._api_url + '/whoami';
  
  private _user_url = this._api_url + '/user';

  private _users_url = this._user_url + '/all';

  private _reset_credentials_url = this._user_url + '/reset-credentials';

  private _article_url = this._api_url + '/article';
  
  get foo_url(): string {
      return this._foo_url;
  }
  
  get auth_url(): string {
      return this._auth_url;
  }
  
  get signup_url():string {
      return this._signup_url;
  }
  
  get login_url(): string {
      return this._login_url;
  }

  get logout_url(): string {
      return this._logout_url;
  }
  
  get verify_email_url(): string {
      return this._verify_email_url;
  }
  
  get resend_email_verification_url(): string {
      return this._resend_email_verification_url;
  }
  
  get refresh_token_url(): string {
      return this._refresh_token_url;
  }
  
  get change_password_url(): string {
      return this._change_password_url;
  }  
  
  get whoami_url(): string {
      return this._whoami_url;
  }
  
  get users_url(): string {
      return this._users_url;
  }
  
  get reset_credentials_url(): string {
      return this._reset_credentials_url;
  }

  get article_url():string {
      return this._article_url;
  }

}
