import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartListComponent } from './product-cart-list.component';

describe('ProductCartListComponent', () => {
  let component: ProductCartListComponent;
  let fixture: ComponentFixture<ProductCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCartListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
