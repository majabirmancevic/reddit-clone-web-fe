import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusspendCommunityComponent } from './susspend-community.component';

describe('SusspendCommunityComponent', () => {
  let component: SusspendCommunityComponent;
  let fixture: ComponentFixture<SusspendCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusspendCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SusspendCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
