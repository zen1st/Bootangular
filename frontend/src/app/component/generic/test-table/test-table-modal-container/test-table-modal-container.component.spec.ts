import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTableModalContainerComponent } from './test-table-modal-container.component';

describe('TestTableModalContainerComponent', () => {
  let component: TestTableModalContainerComponent;
  let fixture: ComponentFixture<TestTableModalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTableModalContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTableModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
