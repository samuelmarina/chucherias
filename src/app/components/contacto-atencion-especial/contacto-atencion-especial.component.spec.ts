import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoAtencionEspecialComponent } from './contacto-atencion-especial.component';

describe('ContactoAtencionEspecialComponent', () => {
  let component: ContactoAtencionEspecialComponent;
  let fixture: ComponentFixture<ContactoAtencionEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoAtencionEspecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoAtencionEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
