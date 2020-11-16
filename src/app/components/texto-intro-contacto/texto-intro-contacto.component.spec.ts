import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoIntroContactoComponent } from './texto-intro-contacto.component';

describe('TextoIntroContactoComponent', () => {
  let component: TextoIntroContactoComponent;
  let fixture: ComponentFixture<TextoIntroContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoIntroContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoIntroContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
