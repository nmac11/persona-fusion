import { OnInit, Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { Observer, Observable } from 'rxjs';
import { serviceToken } from '../../../helpers/service-token-helper';

@Component({
  selector: 'game-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  persona: Persona;
  specialFusions: Persona[] = [];
  compendiumService: CompendiumService;

  constructor(private route: ActivatedRoute, private router: Router, private injector: Injector) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const game = this.route.parent.snapshot.params.game;
    this.compendiumService = this.injector.get<CompendiumService>(
      serviceToken[game].compendium,
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((p: object) => {
      this.persona = this.compendiumService.find(p['persona_name']);
      if (this.persona?.special) {
        this.specialFusions = this.compendiumService.getSpecialFusions(
          this.persona,
        );
      }
    });
  }

  arcanaName(arcana: number): string {
    return this.compendiumService.arcanaName(arcana);
  }
}
