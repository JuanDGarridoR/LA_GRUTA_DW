import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoEstrellaComponent } from './plato-estrella.component';

describe('PlatoEstrellaComponent', () => {
  let component: PlatoEstrellaComponent;
  let fixture: ComponentFixture<PlatoEstrellaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatoEstrellaComponent]
    });
    fixture = TestBed.createComponent(PlatoEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
