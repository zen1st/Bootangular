import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsmadeAuthorizedComponent } from './blogsmade-authorized.component';

describe('BlogsmadeAuthorizedComponent', () => {
  let component: BlogsmadeAuthorizedComponent;
  let fixture: ComponentFixture<BlogsmadeAuthorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsmadeAuthorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsmadeAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
