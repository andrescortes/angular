import { Routes } from "@angular/router";
import { StoreFrontLayout } from "./layouts/store-front-layout/store-front-layout";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
      },
      {
        path: 'gender/:gender',
        loadComponent: () => import('./pages/gender-page/gender-page').then(m => m.GenderPage)
      },
      {
        path: 'product/:slug',
        loadComponent: () => import('./pages/product-page/product-page').then(m => m.ProductPage)
      },
      {
        path: '**',
        component: NotFoundPage
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default storeFrontRoutes;
