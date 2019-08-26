import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTableModalComponent } from './test-table-modal.component';

describe('TestTableModalComponent', () => {
  let component: TestTableModalComponent;
  let fixture: ComponentFixture<TestTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
