import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsResolver } from './resolvers/settings.resolver';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {
    path: '',
    resolve: { settings: SettingsResolver },
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
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
        path: 'p3ans',
        loadChildren: () =>
          import('./p3ans/p3ans.module').then((m) => m.P3ANSModule),
      },
      {
        path: 'p4',
        loadChildren: () => import('./p4/p4.module').then((m) => m.P4Module),
      },
      {
        path: 'p4g',
        loadChildren: () => import('./p4g/p4g.module').then((m) => m.P4GModule),
      },
      {
        path: 'p5',
        loadChildren: () => import('./p5/p5.module').then((m) => m.P5Module),
      },
      {
        path: 'p5r',
        loadChildren: () => import('./p5r/p5r.module').then((m) => m.P5RModule),
      },
      {
        path: 'settings',
        component: AppSettingsComponent,
        resolve: { settings: SettingsResolver },
      },
      {
        path: 'reference',
        component: ReferenceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
