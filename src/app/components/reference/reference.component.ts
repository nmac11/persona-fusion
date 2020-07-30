import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

interface Reference {
  author: string;
  url: string;
  title: string;
}

const REFERENCE: Reference[] = [
  {
    author: 'Arthellinus',
    url:
      'https://gamefaqs.gamespot.com/ps2/932312-shin-megami-tensei-persona-3/faqs/49926',
    title: 'Persona 3 Game Mechanics/Persona Database',
  },
  {
    author: 'aqui384',
    url: 'https://aqiu384.github.io/megaten-fusion-tool',
    title: 'Megaten Fusion Tool',
  },
  {
    author: 'arantius',
    url: 'https://arantius.github.io/persona-fusion-calculator',
    title: 'Persona Fusion Calculator',
  },
  {
    author: 'chinhodado',
    url: 'https://chinhodado.github.io/persona5_calculator',
    title: 'Persona 5 Fusion Calculator',
  },
  {
    author: 'Corin Bae',
    url:
      'https://www.thegamer.com/persona-5-royal-treasure-demon-location-weakness-fusion-guide/',
    title: 'Persona 5 Royal: Treasure Demon Guide',
  },
  {
    author: 'Boomerang78',
    url:
      'https://gamefaqs.gamespot.com/psp/971508-shin-megami-tensei-persona-3-portable/map/8014',
    title: 'Shin Megami Tensei: Persona 3 Portable - Fusion Chart',
  },
  {
    author: 'MasterVG782',
    url:
      'https://gamefaqs.gamespot.com/ps2/937269-shin-megami-tensei-persona-3-fes/map/5379',
    title: 'Shin Megami Tensei: Persona 3 FES - Fusion Chart',
  },
];

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css'],
})
export class ReferenceComponent implements OnInit {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Reference');
  }

  get reference(): Reference[] {
    return REFERENCE;
  }

  ngOnInit(): void {}
}
