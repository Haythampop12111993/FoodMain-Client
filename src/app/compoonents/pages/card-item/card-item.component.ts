import { CommonModule } from '@angular/common';
import { GlobleService } from './../../../services/globle/globle.service';
import { FoodQuickViewsComponent } from './../food-quick-views/food-quick-views.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [FoodQuickViewsComponent, CommonModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  @Input() foodItem: any = {};
  foodView = false;
  FoodQuickView: {} = {};
  constructor(public GlobleService: GlobleService) {}
  FoodView(foodViewItem: {}) {
    // this.foodView = true;
    // this.GlobleService.showFoodQuickView.next(true);
    // this.GlobleService.showFoodQuickView$.subscribe((res) => {
    //   this.foodView = res;
    // });

    // console.log(foodViewItem);
    // this.FoodQuickView = foodViewItem;
    this.GlobleService.foodData = foodViewItem;
    this.GlobleService.foodShow = true;
  }
}
