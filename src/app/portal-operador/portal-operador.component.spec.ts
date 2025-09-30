import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalOperadorComponent } from './portal-operador.component';

describe('PortalOperadorComponent', () => {
  let component: PortalOperadorComponent;
  let fixture: ComponentFixture<PortalOperadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalOperadorComponent]
    });
    fixture = TestBed.createComponent(PortalOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});