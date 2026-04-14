import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core'
import {Page} from '../services/page';


export const guard: CanActivateFn = (route, state) => {
  // @ts-ignore
  const router: Router = inject(Router);
  const storedUser = localStorage.getItem('currentUser');
  const adminUser = localStorage.getItem('adminUser');

  if (storedUser || adminUser) {
    return true;
  } else {
    router.navigate(['/login'])
    return false
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  // @ts-ignore
  const router: Router = inject(Router);
  const adminUser = localStorage.getItem('adminUser');


  if (adminUser) {
    return true;
  } else {
    router.navigate(['/index'])
    return false
  }
};


