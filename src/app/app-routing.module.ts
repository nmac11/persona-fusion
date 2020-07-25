import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './game/game.component';
import { PersonaListComponent } from './game/components/persona-list/persona-list.component';
import { EditPersonaComponent } from './my-list/components/edit-persona/edit-persona.component';
import { PersonaComponent } from './game/components/persona/persona.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { MyListComponent } from './my-list/my-list.component';
import { ValidGameGuard } from './valid-game.guard';
import { GameResolver } from './resolvers/game.resolver';
import { SettingsComponent } from './settings/settings.component';
import { SettingsResolver } from './resolvers/settings.resolver';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { ReferenceComponent } from './components/reference/reference.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'settings',
    component: AppSettingsComponent,
    resolve: { settings: SettingsResolver },
  },
  {
    path: 'reference',
    component: ReferenceComponent,
  },
  {
    path: ':game',
    component: GameComponent,
    resolve: { game: GameResolver, settings: SettingsResolver },
    canActivate: [ValidGameGuard],
    children: [
      {
        path: '',
        component: PersonaListComponent,
        data: { page: 'Personae' },
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
        path: 'persona/:persona_name',
        component: PersonaComponent,
        data: { page: 'Persona' },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
