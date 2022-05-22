import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboFormComponent } from './collabo-form.component';

describe('CollaboFormComponent', () => {
  let component: CollaboFormComponent;
  let fixture: ComponentFixture<CollaboFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
