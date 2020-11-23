import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistProductsComponent } from './wishlist-products.component';

describe('WishlistProductsComponent', () => {
  let component: WishlistProductsComponent;
  let fixture: ComponentFixture<WishlistProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
