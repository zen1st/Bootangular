import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEditDialogComponent } from './chat-edit-dialog.component';

describe('ChatEditDialogComponent', () => {
  let component: ChatEditDialogComponent;
  let fixture: ComponentFixture<ChatEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
