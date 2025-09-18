import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparentHeaderComponent } from './transparent-header.component';

describe('TransparentHeaderComponent', () => {
  let component: TransparentHeaderComponent;
  let fixture: ComponentFixture<TransparentHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransparentHeaderComponent]
    });
    fixture = TestBed.createComponent(TransparentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
