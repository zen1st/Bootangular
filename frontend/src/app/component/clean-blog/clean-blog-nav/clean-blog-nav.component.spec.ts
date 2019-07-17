import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanBlogNavComponent } from './clean-blog-nav.component';

describe('CleanBlogNavComponent', () => {
  let component: CleanBlogNavComponent;
  let fixture: ComponentFixture<CleanBlogNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanBlogNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanBlogNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
