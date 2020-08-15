import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameComponent } from '../game/game.component';
import { PersonaListComponent } from '../game/components/persona-list/persona-list.component';
import { MyListComponent } from '../my-list/my-list.component';
import { PersonaComponent } from '../game/components/persona/persona.component';
import { EditPersonaComponent } from '../my-list/components/edit-persona/edit-persona.component';
import { SimulatorComponent } from '../simulator/simulator.component';
import { SettingsComponent } from '../settings/settings.component';

// import { EditPersonaComponent } from '../my-list/components/edit-persona/edit-persona.component';
// import { SimulatorComponent } from '../simulator/simulator.component';
// import { PersonaComponent } from '../game/components/persona/persona.component';
// import { SettingsComponent } from '../settings/settings.component';

const ROUTES = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: '',
        component: PersonaListComponent,
        data: { page: 'Personae' },
      },
      {
        path: 'persona/:persona_name',
        component: PersonaComponent,
        data: { page: 'Persona' },
      },
      {
        path: 'my-list',
        component: MyListComponent,
        data: { page: 'My List' },
      },
      {
        path: 'edit/:save_id',
        component: EditPersonaComponent,
        data: { page: 'Edit' },
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
  // {
  //   path: 'my-list',
  //   component: MyListComponent,
  //   data: { page: 'My List' },
  // },
  // {
  //   path: 'edit/:save_id',
  //   component: EditPersonaComponent,
  //   data: { page: 'Edit' },
  // },
  // {
  //   path: 'simulator',
  //   component: SimulatorComponent,
  //   data: { page: 'Simulator' },
  // },
  // {
  //   path: 'settings',
  //   component: SettingsComponent,
  //   data: { page: 'Settings' },
  // },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class RoutingModule {}
