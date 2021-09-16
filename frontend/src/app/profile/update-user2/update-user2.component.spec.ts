import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUser2Component } from './update-user2.component';

describe('UpdateUser2Component', () => {
  let component: UpdateUser2Component;
  let fixture: ComponentFixture<UpdateUser2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUser2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUser2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
