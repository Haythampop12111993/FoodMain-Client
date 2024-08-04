import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');
  console.log(token);
  if (token) {
    const header = req.headers.set('Authorization', `Bearer ${token}`);

    const newReq = req.clone({ headers: header });
    return next(newReq);
  }
  return next(req);
};
