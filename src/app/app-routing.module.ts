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
import { GameNameResolver } from './resolvers/game-name.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: ':game',
    component: GameComponent,
    resolve: { game: GameNameResolver },
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
        path: 'edit/:save_name',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
