import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoomCardComponent } from './app-room-card.component';

describe('AppRoomCardComponent', () => {
  let component: AppRoomCardComponent;
  let fixture: ComponentFixture<AppRoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoomCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
