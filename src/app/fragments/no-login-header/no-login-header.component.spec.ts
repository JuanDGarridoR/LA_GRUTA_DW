import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLoginHeaderComponent } from './no-login-header.component';

describe('NoLoginHeaderComponent', () => {
  let component: NoLoginHeaderComponent;
  let fixture: ComponentFixture<NoLoginHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoLoginHeaderComponent]
    });
    fixture = TestBed.createComponent(NoLoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
