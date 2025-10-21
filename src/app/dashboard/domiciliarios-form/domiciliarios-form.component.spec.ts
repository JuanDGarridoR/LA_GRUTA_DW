import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomiciliariosFormComponent } from './domiciliarios-form.component';

describe('DomiciliariosFormComponent', () => {
  let component: DomiciliariosFormComponent;
  let fixture: ComponentFixture<DomiciliariosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomiciliariosFormComponent]
    });
    fixture = TestBed.createComponent(DomiciliariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
