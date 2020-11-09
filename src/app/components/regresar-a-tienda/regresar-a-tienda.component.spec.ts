import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegresarATiendaComponent } from './regresar-a-tienda.component';

describe('RegresarATiendaComponent', () => {
  let component: RegresarATiendaComponent;
  let fixture: ComponentFixture<RegresarATiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegresarATiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegresarATiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
