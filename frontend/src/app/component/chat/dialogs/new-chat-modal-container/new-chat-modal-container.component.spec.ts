import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatModalContainerComponent } from './new-chat-modal-container.component';

describe('NewChatModalContainerComponent', () => {
  let component: NewChatModalContainerComponent;
  let fixture: ComponentFixture<NewChatModalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChatModalContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChatModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
