import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderdosComponent } from './headerdos.component';

describe('HeaderdosComponent', () => {
  let component: HeaderdosComponent;
  let fixture: ComponentFixture<HeaderdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderdosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
