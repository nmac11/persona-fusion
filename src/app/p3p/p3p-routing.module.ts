import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { P3PComponent } from './p3p.component';
import { ListComponent } from './components/list/list.component';
import { FusionsComponent } from './components/fusions/fusions.component';

const routes: Routes = [
  {
    path: '',
    component: P3PComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'fusions/:persona_name', component: FusionsComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P3PRoutingModule {}
