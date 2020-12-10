import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNameComponent } from './filter-name.component';

describe('FilterNameComponent', () => {
  let component: FilterNameComponent;
  let fixture: ComponentFixture<FilterNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
