import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiutuKursaiComponent } from './valiutu-kursai.component';

describe('ValiutuKursaiComponent', () => {
  let component: ValiutuKursaiComponent;
  let fixture: ComponentFixture<ValiutuKursaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValiutuKursaiComponent]
    });
    fixture = TestBed.createComponent(ValiutuKursaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
