import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { P4GComponent } from './p4g.component';
import { P4GListComponent } from './components/list/list.component';
import { P4GFusionsComponent } from './components/fusions/fusions.component';
import { P4GNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P4GTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';

const routes: Routes = [
  {
    path: '',
    component: P4GComponent,
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
