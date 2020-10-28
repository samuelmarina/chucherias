import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdenesComponent } from './admin-ordenes.component';

describe('AdminOrdenesComponent', () => {
  let component: AdminOrdenesComponent;
  let fixture: ComponentFixture<AdminOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
