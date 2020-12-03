import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalButtonsComponent } from './paypal-buttons.component';

describe('PaypalButtonsComponent', () => {
  let component: PaypalButtonsComponent;
  let fixture: ComponentFixture<PaypalButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
