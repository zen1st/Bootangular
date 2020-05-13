import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadEmailVerficationTokenComponent } from './bad-email-verfication-token.component';

describe('BadEmailVerficationTokenComponent', () => {
  let component: BadEmailVerficationTokenComponent;
  let fixture: ComponentFixture<BadEmailVerficationTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadEmailVerficationTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadEmailVerficationTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
