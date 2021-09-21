import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadertresComponent } from './headertres.component';

describe('HeadertresComponent', () => {
  let component: HeadertresComponent;
  let fixture: ComponentFixture<HeadertresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadertresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadertresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
