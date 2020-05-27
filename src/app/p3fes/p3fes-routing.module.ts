import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { P3FESComponent } from './p3fes.component';
import { P3FESListComponent } from './components/list/list.component';
import { P3FESFusionsComponent } from './components/fusions/fusions.component';
import { P3FESNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P3FESTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';

const routes: Routes = [
  {
    path: '',
    component: P3FESComponent,
    children: [
      { path: '', component: P3FESListComponent },
      {
        path: 'fusions/:persona_name',
        component: P3FESFusionsComponent,
        children: [
          {
            path: '',
            component: P3FESNormalFusionsComponent,
          },
          {
            path: 'triangle',
            component: P3FESTriangleFusionsComponent,
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
export class P3FESRoutingModule {}
