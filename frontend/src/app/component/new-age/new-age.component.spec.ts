import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgeComponent } from './new-age.component';

describe('NewAgeComponent', () => {
  let component: NewAgeComponent;
  let fixture: ComponentFixture<NewAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
