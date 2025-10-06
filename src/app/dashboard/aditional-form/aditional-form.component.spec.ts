import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalFormComponent } from './aditional-form.component';

describe('AditionalFormComponent', () => {
  let component: AditionalFormComponent;
  let fixture: ComponentFixture<AditionalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AditionalFormComponent]
    });
    fixture = TestBed.createComponent(AditionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
