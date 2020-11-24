import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetirosComponent } from './admin-retiros.component';

describe('AdminRetirosComponent', () => {
  let component: AdminRetirosComponent;
  let fixture: ComponentFixture<AdminRetirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRetirosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRetirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
