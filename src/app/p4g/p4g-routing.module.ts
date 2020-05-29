import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { P4GListComponent } from './components/list/list.component';
import { P4GFusionsComponent } from './components/fusions/fusions.component';
import { P4GNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P4GTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { NavContentComponent } from '../shared/nav-content/nav-content.component';

const routes: Routes = [
  {
    path: '',
    component: NavContentComponent,
    data: { title: 'P4G' },
    children: [
      { path: '', component: P4GListComponent },
      {
        path: 'fusions/:persona_name',
        component: P4GFusionsComponent,
        children: [
          {
            path: '',
            component: P4GNormalFusionsComponent,
          },
          {
            path: 'triangle',
            component: P4GTriangleFusionsComponent,
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
export class P4GRoutingModule {}
