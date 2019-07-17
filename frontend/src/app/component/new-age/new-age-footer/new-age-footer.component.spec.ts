import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgeFooterComponent } from './new-age-footer.component';

describe('NewAgeFooterComponent', () => {
  let component: NewAgeFooterComponent;
  let fixture: ComponentFixture<NewAgeFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAgeFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAgeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
