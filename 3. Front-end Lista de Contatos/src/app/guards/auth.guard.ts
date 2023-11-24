import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

const publicRoutes: string[] = [
    "/login"
];

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router: Router = inject(Router);

    let isUserLoggedIn: string|null = sessionStorage.getItem("access_token");
    let publicRoute = isPublicRoute(state.url);

    if(isUserLoggedIn == null){
        if(publicRoute){
            return true;
        } else {
            router.navigateByUrl("/login");
            return false;
        }
    } else {
        if(publicRoute){
            router.navigateByUrl("/dashboard");
            return false;
        } else {
            return true;
        }
    }
};

const isPublicRoute = (route: string): boolean => {
    return (publicRoutes.indexOf(route) > -1);
}