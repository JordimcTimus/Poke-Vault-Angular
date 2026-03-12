import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core'

export const guard: CanActivateFn = (route, state) => {
  // @ts-ignore
  const router: Router = inject(Router);
  const storedUser = localStorage.getItem('currentUser');

  if (storedUser) {
    return true;
  } else {
    router.navigate(['/login'])
    return false
  }
};
