import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { P3PComponent } from './p3p.component';
import { ListComponent } from './components/list/list.component';
import { FusionsComponent } from './components/fusions/fusions.component';
import { NormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { TriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';

const routes: Routes = [
  {
    path: '',
    component: P3PComponent,
    children: [
      { path: '', component: ListComponent },
      {
        path: 'fusions/:persona_name',
        component: FusionsComponent,
        children: [
          {
            path: '',
            component: NormalFusionsComponent,
          },
          {
            path: 'triangle',
            component: TriangleFusionsComponent,
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
