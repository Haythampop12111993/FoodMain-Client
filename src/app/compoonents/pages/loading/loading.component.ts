import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading-services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  isLoading: boolean = true;
  constructor(private LoadingService: LoadingService) {
    this.LoadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
