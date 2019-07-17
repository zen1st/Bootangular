import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanBlogPreviewComponent } from './clean-blog-preview.component';

describe('CleanBlogPreviewComponent', () => {
  let component: CleanBlogPreviewComponent;
  let fixture: ComponentFixture<CleanBlogPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanBlogPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanBlogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
