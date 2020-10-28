import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaComponent } from './bolsa.component';

describe('BolsaComponent', () => {
  let component: BolsaComponent;
  let fixture: ComponentFixture<BolsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
