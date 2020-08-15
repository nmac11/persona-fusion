import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameContainerComponent } from '../shared/game-container/game-container.component';
import { PersonaListComponent } from '../personae/components/persona-list/persona-list.component';
import { MyListComponent } from '../my-list/my-list.component';
import { ListComponent } from '../my-list/components/list/list.component';
import { PersonaComponent } from '../personae/components/persona/persona.component';
import { EditPersonaComponent } from '../my-list/components/edit-persona/edit-persona.component';
import { SimulatorComponent } from '../simulator/simulator.component';
import { SettingsComponent } from '../settings/settings.component';
import { PersonaeComponent } from '../personae/personae.component';

const ROUTES = [
  {
    path: '',
    component: GameContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'personae',
      },
      {
        path: 'personae',
        component: PersonaeComponent,
        data: { page: 'Personae' },
        children: [
          {
            path: '',
            component: PersonaListComponent,
          },
          {
            path: ':persona_name',
            component: PersonaComponent,
          },
        ]
      },
      {
        path: 'my-list',
        component: MyListComponent,
        data: { page: 'My List' },
        children: [
          {
            path: '',
            component: ListComponent,
          },
          {
            path: ':save_id',
            component: EditPersonaComponent,
          },
        ],
      },
      {
        path: 'simulator',
        component: SimulatorComponent,
        data: { page: 'Simulator' },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { page: 'Settings' },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class RoutingModule {}
