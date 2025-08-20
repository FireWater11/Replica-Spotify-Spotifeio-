import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // se a url tiver vazia, automaticamente vai para a url /login
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routes').then(rota => rota.routes)
  }
];
