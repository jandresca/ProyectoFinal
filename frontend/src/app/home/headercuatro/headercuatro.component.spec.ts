import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercuatroComponent } from './headercuatro.component';

describe('HeadercuatroComponent', () => {
  let component: HeadercuatroComponent;
  let fixture: ComponentFixture<HeadercuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadercuatroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadercuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
