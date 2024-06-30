import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashSaleFormComponent } from './flash-sale-form.component';

describe('FlashSaleFormComponent', () => {
  let component: FlashSaleFormComponent;
  let fixture: ComponentFixture<FlashSaleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashSaleFormComponent]
    });
    fixture = TestBed.createComponent(FlashSaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
