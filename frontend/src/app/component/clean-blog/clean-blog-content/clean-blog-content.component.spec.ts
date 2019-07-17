import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanBlogContentComponent } from './clean-blog-content.component';

describe('CleanBlogContentComponent', () => {
  let component: CleanBlogContentComponent;
  let fixture: ComponentFixture<CleanBlogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanBlogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanBlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
