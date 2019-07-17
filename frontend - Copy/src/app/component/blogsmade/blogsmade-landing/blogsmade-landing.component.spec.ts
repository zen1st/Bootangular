import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsmadeLandingComponent } from './blogsmade-landing.component';

describe('BlogsmadeLandingComponent', () => {
  let component: BlogsmadeLandingComponent;
  let fixture: ComponentFixture<BlogsmadeLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsmadeLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsmadeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
