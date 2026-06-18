import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'selecoes',
    loadComponent: () => import('./pages/selecoes/selecoes.page').then(m => m.SelecoesPage),
  },
  {
    path: 'grupos',
    loadComponent: () => import('./pages/grupos/grupos.page').then(m => m.GruposPage),
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.page').then(m => m.DetalhesPage),
  },
];
