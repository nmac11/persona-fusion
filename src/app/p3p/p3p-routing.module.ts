import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { P3PListComponent } from './components/list/list.component';
import { P3PFusionsComponent } from './components/fusions/fusions.component';
import { P3PNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P3PTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { NavContentComponent } from '../shared/nav-content/nav-content.component';

const routes: Routes = [
  {
    path: '',
    component: NavContentComponent,
    data: { title: 'P3P' },
    children: [
      { path: '', component: P3PListComponent },
      {
        path: 'fusions/:persona_name',
        component: P3PFusionsComponent,
        children: [
          {
            path: '',
            component: P3PNormalFusionsComponent,
          },
          {
            path: 'triangle',
            component: P3PTriangleFusionsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P3PRoutingModule {}
