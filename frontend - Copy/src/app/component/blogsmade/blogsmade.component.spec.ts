import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsmadeComponent } from './blogsmade.component';

describe('BlogsmadeComponent', () => {
  let component: BlogsmadeComponent;
  let fixture: ComponentFixture<BlogsmadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsmadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsmadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
