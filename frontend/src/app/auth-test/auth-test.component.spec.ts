import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthTestComponent } from './home.component';
import { ApiCardComponent, GithubComponent } from '../component';
import { MockApiService } from '../service/mocks/api.service.mock';

import {
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ApiService,
  AuthService,
  UserService,
  FooService,
  ConfigService
} from '../service';

describe('AuthTestComponent', () => {
  let component: AuthTestComponent;
  let fixture: ComponentFixture<AuthTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthTestComponent,
        ApiCardComponent,
        GithubComponent
      ],
      imports: [
        MatButtonModule,
        MatCardModule
      ],
      providers: [
        {
          provide: ApiService,
          useClass: MockApiService
        },
        AuthService,
        UserService,
        FooService,
        ConfigService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
