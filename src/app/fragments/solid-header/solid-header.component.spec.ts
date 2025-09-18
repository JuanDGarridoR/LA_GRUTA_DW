import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidHeaderComponent } from './solid-header.component';

describe('SolidHeaderComponent', () => {
  let component: SolidHeaderComponent;
  let fixture: ComponentFixture<SolidHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolidHeaderComponent]
    });
    fixture = TestBed.createComponent(SolidHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
