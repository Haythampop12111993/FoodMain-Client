import { LoadingService } from './../../services/loading-services/loading.service';
import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  var pendingReqs = 0;
  let loadingService = inject(LoadingService);
  let handleHideLoading = function () {
    pendingReqs = pendingReqs - 1;
    if (pendingReqs === 0) {
      loadingService.hideLoading();
    }
  };

  loadingService.showLoading();
  pendingReqs = pendingReqs + 1;

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          handleHideLoading();
        }
      },
      error: (err) => {
        handleHideLoading();
      },
    })
  );
};
