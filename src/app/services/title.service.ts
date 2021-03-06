import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private titleSetter: Title) {}

  setTitle(...pageTitle): void {
    let title = 'Persona Fusion Simulator';
    if (pageTitle !== []) title = `${pageTitle.join(' - ')} - ${title}`;
    this.titleSetter.setTitle(title);
  }
}
