import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleNavComponent } from './article-nav.component';

describe('ArticleNavComponent', () => {
  let component: ArticleNavComponent;
  let fixture: ComponentFixture<ArticleNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
