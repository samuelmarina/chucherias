import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAleatoriosComponent } from './productos-aleatorios.component';

describe('ProductosAleatoriosComponent', () => {
  let component: ProductosAleatoriosComponent;
  let fixture: ComponentFixture<ProductosAleatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosAleatoriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosAleatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
