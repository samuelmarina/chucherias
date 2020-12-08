import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTrackingListComponent } from './customer-tracking-list.component';

describe('CustomerTrackingListComponent', () => {
  let component: CustomerTrackingListComponent;
  let fixture: ComponentFixture<CustomerTrackingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTrackingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTrackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
