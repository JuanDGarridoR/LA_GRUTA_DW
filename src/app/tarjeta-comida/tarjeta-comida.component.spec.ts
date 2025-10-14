import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaComidaComponent } from './tarjeta-comida.component';
import { Comida } from '../models/comida/comida.model';
import { By } from '@angular/platform-browser';

describe('TarjetaComidaComponent', () => {
  let component: TarjetaComidaComponent;
  let fixture: ComponentFixture<TarjetaComidaComponent>;

  const mockComida: Comida = {
    id: 100,
    nombre: 'Pizza Test',
    descripcion: 'Pizza Margarita',
    precio: 19900,
    imagen: 'assets/images/Margherita-Pizza-093.webp',
    cantidad: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaComidaComponent]
    });
    fixture = TestBed.createComponent(TarjetaComidaComponent);
    component = fixture.componentInstance;
    component.comida = { ...mockComida }; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render comida name', () => {
    const titleElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(titleElement.textContent).toContain(mockComida.nombre);
  });

  it('should increment cantidad when sumarCantidad is called', () => {
    component.sumarCantidad();
    expect(component.comida.cantidad).toBe(1);
  });

  it('should decrement cantidad when restarCantidad is called', () => {
    component.comida.cantidad = 2;
    component.restarCantidad();
    expect(component.comida.cantidad).toBe(1);
  });

  it('should not decrement below 0', () => {
    component.comida.cantidad = 0;
    component.restarCantidad();
    expect(component.comida.cantidad).toBe(0);
  });
});

