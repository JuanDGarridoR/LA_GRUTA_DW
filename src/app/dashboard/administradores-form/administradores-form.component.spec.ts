import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresFormComponent } from './administradores-form.component';

describe('AdministradoresFormComponent', () => {
  let component: AdministradoresFormComponent;
  let fixture: ComponentFixture<AdministradoresFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministradoresFormComponent]
    });
    fixture = TestBed.createComponent(AdministradoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
