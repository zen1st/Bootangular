import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadUserComponent } from './bad-user.component';

describe('BadUserComponent', () => {
  let component: BadUserComponent;
  let fixture: ComponentFixture<BadUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
