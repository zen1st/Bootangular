import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedChatComponent } from './based-chat.component';

describe('BasedChatComponent', () => {
  let component: BasedChatComponent;
  let fixture: ComponentFixture<BasedChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
