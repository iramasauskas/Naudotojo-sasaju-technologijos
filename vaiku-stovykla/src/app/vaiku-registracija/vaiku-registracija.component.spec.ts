import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaikuRegistracijaComponent } from './vaiku-registracija.component';

describe('VaikuRegistracijaComponent', () => {
  let component: VaikuRegistracijaComponent;
  let fixture: ComponentFixture<VaikuRegistracijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaikuRegistracijaComponent]
    });
    fixture = TestBed.createComponent(VaikuRegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
