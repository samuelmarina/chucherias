import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundContactoComponent } from './background-contacto.component';

describe('BackgroundContactoComponent', () => {
  let component: BackgroundContactoComponent;
  let fixture: ComponentFixture<BackgroundContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
