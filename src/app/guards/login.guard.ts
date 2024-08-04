import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = localStorage.getItem('userToken');
  if (token) {
    return true;
  } else {
    router.navigate(['login'], {
      queryParams: {
        returnUrl: router.url,
      },
    });
    toastr.error('Please login first');
    return false;
  }
};
