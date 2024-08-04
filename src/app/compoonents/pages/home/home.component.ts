import { GlobleService } from './../../../services/globle/globle.service';
import { FoodService } from './../../../services/food-service/food.service';
import { Component, OnInit, SimpleChanges, signal } from '@angular/core';
import { FoodList } from '../../../interfaces/food-list';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule, NgClass } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { CardItemComponent } from '../card-item/card-item.component';
import { TagsBarComponent } from '../tags-bar/tags-bar.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { PaginatorModule } from 'primeng/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    SkeletonModule,
    CardItemComponent,
    TagsBarComponent,
    FormsModule,
    CartComponent,
    NgClass,
    NgxPaginationModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  foods = signal<FoodList[]>([]);
  isLoading = signal<boolean>(false);
  totalPages: any = 0;
  itemsPerPage: number = 4;
  totalItems: number = 0;
  layout: string = 'list';
  test: string = '';
  tagName = 'All';
  searchKey = '';
  page = 1;
  p: number = 1;

  constructor(
    private FoodService: FoodService,
    public GlobleService: GlobleService
  ) {}
  ngOnInit(): void {
    this.FoodService.getAllFood(
      this.tagName,
      this.page,
      this.searchKey
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.totalPages = data.data.totalPages;
        console.log(this.totalPages);
        // this.foods = data.data.food;
        this.foods.set(data.data.food);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(true);
        this.foods.set([]);
      },
      complete: () => {
        console.log('completed');
        this.isLoading.set(true);
      },
    });
  }
  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }

  counterArray(n: number): any[] {
    return Array(n);
  }

  search(event: any) {
    this.searchKey = event.target.value;
    this.isLoading.set(false);
    this.page = 1;
    this.ngOnInit();
    // if (this.tagName === 'All') {
    //   this.filterFood = this.foods;
    // }
    // console.log(event.target.value);
    // const eventValue = event.target.value.toLowerCase().trim();
    // if (eventValue !== '') {
    //   if (this.tagName === 'All') {
    //     this.filterFood = [
    //       ...this.foods.filter((e) => {
    //         return e.name.toLowerCase().includes(eventValue);
    //       }),
    //     ];
    //   } else {
    //     this.filterFood = [
    //       ...this.foods
    //         .filter((e) => {
    //           return e.name.toLowerCase().includes(eventValue);
    //         })
    //         .filter((e) => {
    //           return e.tags?.includes(this.tagName);
    //         }),
    //     ];
    //   }
    // } else if (this.tagName != 'All') {
    //   this.filterFood = this.foods.filter((e) => {
    //     return e.tags?.includes(this.tagName);
    //   });
    // } else {
    //   this.filterFood = this.foods;
    // }
    // console.log(this.filterFood);
  }
  selectedTag($event: string) {
    if ($event === 'All') {
      this.page = 1;
      this.searchKey = '';
      this.isLoading.set(false);
    }
    console.log($event);
    this.tagName = $event;
    this.searchKey = '';
    this.page = 1;
    this.isLoading.set(false);
    this.ngOnInit();
  }
  changePage(page: number) {
    this.isLoading.set(false);
    this.page = page;
    console.log(this.page);
    this.ngOnInit();
  }
  prev() {
    this.page -= 1;
    this.ngOnInit();
  }
  next() {
    this.page += 1;
    this.ngOnInit();
  }
}

// ngOnChanges(changes: SimpleChanges): void {
//   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
//   //Add '${implements OnChanges}' to the class.

//   console.log(changes);

//   console.log(this.tagName);
// }
