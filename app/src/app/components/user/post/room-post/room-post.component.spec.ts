import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPostComponent } from './room-post.component';

describe('RoomPostComponent', () => {
  let component: RoomPostComponent;
  let fixture: ComponentFixture<RoomPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
