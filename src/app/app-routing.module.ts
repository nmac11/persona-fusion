import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './game/game.component';
import { PersonaListComponent } from './game/components/persona-list/persona-list.component';
import { PersonaComponent } from './game/components/persona/persona.component';
import { ValidGameGuard } from './valid-game.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: ':game',
    component: GameComponent,
    canActivate: [ValidGameGuard],
    children: [
      {
        path: '',
        component: PersonaListComponent,
      },
      {
        path: 'persona/:persona_name',
        component: PersonaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
