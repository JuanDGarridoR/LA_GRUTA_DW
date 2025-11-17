import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoresFormComponent } from './operadores-form.component';

describe('OperadoresFormComponent', () => {
  let component: OperadoresFormComponent;
  let fixture: ComponentFixture<OperadoresFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperadoresFormComponent]
    });
    fixture = TestBed.createComponent(OperadoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
