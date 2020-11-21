import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBagListComponent } from './product-bag-list.component';

describe('ProductBagListComponent', () => {
  let component: ProductBagListComponent;
  let fixture: ComponentFixture<ProductBagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBagListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
