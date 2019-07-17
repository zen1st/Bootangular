import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanBlogFooterComponent } from './clean-blog-footer.component';

describe('CleanBlogFooterComponent', () => {
  let component: CleanBlogFooterComponent;
  let fixture: ComponentFixture<CleanBlogFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanBlogFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanBlogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
