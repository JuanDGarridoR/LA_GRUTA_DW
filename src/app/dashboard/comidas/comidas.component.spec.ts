import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComidasComponent } from './comidas.component';

describe('ComidasComponent', () => {
  let component: ComidasComponent;
  let fixture: ComponentFixture<ComidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComidasComponent]
    });
    fixture = TestBed.createComponent(ComidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});