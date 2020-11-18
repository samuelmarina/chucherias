import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaVaciaComponent } from './bolsa-vacia.component';

describe('BolsaVaciaComponent', () => {
  let component: BolsaVaciaComponent;
  let fixture: ComponentFixture<BolsaVaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolsaVaciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaVaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
