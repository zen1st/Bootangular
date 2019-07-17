import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgeNavComponent } from './new-age-nav.component';

describe('NewAgeNavComponent', () => {
  let component: NewAgeNavComponent;
  let fixture: ComponentFixture<NewAgeNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAgeNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAgeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
