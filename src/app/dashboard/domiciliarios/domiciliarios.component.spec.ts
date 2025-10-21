import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomiciliariosComponent } from './domiciliarios.component';

describe('DomiciliariosComponent', () => {
  let component: DomiciliariosComponent;
  let fixture: ComponentFixture<DomiciliariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomiciliariosComponent]
    });
    fixture = TestBed.createComponent(DomiciliariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
