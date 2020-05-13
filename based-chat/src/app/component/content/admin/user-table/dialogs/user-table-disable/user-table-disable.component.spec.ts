import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableDisableComponent } from './user-table-disable.component';

describe('UserTableDisableComponent', () => {
  let component: UserTableDisableComponent;
  let fixture: ComponentFixture<UserTableDisableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTableDisableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
