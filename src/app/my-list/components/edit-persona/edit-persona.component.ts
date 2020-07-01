import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaStoreService } from '../../../services/persona-store.service';
import { serviceToken } from '../../../helpers/service-token-helper';
import { FusionNode } from '../../../models/fusion-node';

@Component({
  selector: 'my-list-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css'],
})
export class EditPersonaComponent implements OnInit {
  personaStoreService: PersonaStoreService;
  fusionNode: FusionNode;

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
    private router: Router,
  ) {
    const game = this.route.parent.snapshot.params.game;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      serviceToken[game].personaStore,
    );
  }

  ngOnInit(): void {
    const saveName = this.route.snapshot.params.save_name;
    this.personaStoreService
      .load(saveName)
      .then((fusionNode) => (this.fusionNode = fusionNode));
  }
}
