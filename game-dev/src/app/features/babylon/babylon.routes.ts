import { Routes } from "@angular/router";
import { Basic } from "./components/basic/basic";
import { MainLayout } from "./layout/main-layout/main-layout";

export const babylonRoutes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'examples',
        children: [
          {
            path: 'basic',
            component: Basic
          }
        ]
      },
      {
        path: '',
        redirectTo: 'examples/basic',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
