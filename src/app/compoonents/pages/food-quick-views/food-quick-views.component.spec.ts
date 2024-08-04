import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodQuickViewsComponent } from './food-quick-views.component';

describe('FoodQuickViewsComponent', () => {
  let component: FoodQuickViewsComponent;
  let fixture: ComponentFixture<FoodQuickViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodQuickViewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodQuickViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
