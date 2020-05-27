import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'p3p',
    loadChildren: () => import('./p3p/p3p.module').then((m) => m.P3PModule),
  },
  {
    path: 'p3fes',
    loadChildren: () =>
      import('./p3fes/p3fes.module').then((m) => m.P3FESModule),
  },
  {
    path: 'p4g',
    loadChildren: () =>
      import('./p4g/p4g.module').then((m) => m.P4GModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
