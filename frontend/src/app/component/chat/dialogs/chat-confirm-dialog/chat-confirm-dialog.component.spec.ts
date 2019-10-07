import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConfirmDialogComponent } from './chat-confirm-dialog.component';

describe('ChatConfirmDialogComponent', () => {
  let component: ChatConfirmDialogComponent;
  let fixture: ComponentFixture<ChatConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
