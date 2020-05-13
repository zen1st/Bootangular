import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableUnableComponent } from './user-table-unable.component';

describe('UserTableUnableComponent', () => {
  let component: UserTableUnableComponent;
  let fixture: ComponentFixture<UserTableUnableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTableUnableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableUnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
