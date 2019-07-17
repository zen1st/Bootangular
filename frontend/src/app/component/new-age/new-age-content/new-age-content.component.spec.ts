import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgeContentComponent } from './new-age-content.component';

describe('NewAgeContentComponent', () => {
  let component: NewAgeContentComponent;
  let fixture: ComponentFixture<NewAgeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAgeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAgeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
