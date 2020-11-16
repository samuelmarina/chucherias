import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactThroughofComponent } from './contact-throughof.component';

describe('ContactThroughofComponent', () => {
  let component: ContactThroughofComponent;
  let fixture: ComponentFixture<ContactThroughofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactThroughofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactThroughofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
