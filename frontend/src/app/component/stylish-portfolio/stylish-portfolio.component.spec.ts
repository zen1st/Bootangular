import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylishPortfolioComponent } from './stylish-portfolio.component';

describe('StylishPortfolioComponent', () => {
  let component: StylishPortfolioComponent;
  let fixture: ComponentFixture<StylishPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylishPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylishPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
