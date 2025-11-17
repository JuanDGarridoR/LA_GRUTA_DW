import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFormComponent } from './clientes-form.component';

describe('ClientesFormComponent', () => {
  let component: ClientesFormComponent;
  let fixture: ComponentFixture<ClientesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesFormComponent]
    });
    fixture = TestBed.createComponent(ClientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
