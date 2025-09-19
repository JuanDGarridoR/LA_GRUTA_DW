import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaComidasComponent } from './tabla-comidas.component';

describe('TablaComidasComponent', () => {
  let component: TablaComidasComponent;
  let fixture: ComponentFixture<TablaComidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaComidasComponent]
    });
    fixture = TestBed.createComponent(TablaComidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
