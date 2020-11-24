import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirosFormComponent } from './retiros-form.component';

describe('RetirosFormComponent', () => {
  let component: RetirosFormComponent;
  let fixture: ComponentFixture<RetirosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
