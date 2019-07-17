import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanBlogComponent } from './clean-blog.component';

describe('CleanBlogComponent', () => {
  let component: CleanBlogComponent;
  let fixture: ComponentFixture<CleanBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
