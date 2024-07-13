import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // loadComponent: () =>
    //   import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    component: LoginComponent,
    // loadComponent: ()=> import('./pages/login/login.component').then(c=>c.LoginComponent)
  },
  {
    path: 'register',
    loadChildren: ()=> import('./pages/register/register.module').then(m=>m.RegisterModule)
  },
  {
    path: 'movieList',
    loadChildren: ()=> import('./pages/movieList/movie-list.module').then(m=>m.MovieListModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
