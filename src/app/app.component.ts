import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('snav') sideNav;

  navLinks = [
    {
      url: '',
      title: 'Home',
    },
    {
      url: '/p3p/personae',
      title: 'Persona 3 Portable',
    },
    {
      url: '/p3fes/personae',
      title: 'Persona 3 FES: The Journey',
    },
    {
      url: '/p3ans/personae',
      title: 'Persona 3 FES: The Answer',
    },
    {
      url: '/p4/personae',
      title: 'Persona 4',
    },
    {
      url: '/p4g/personae',
      title: 'Persona 4 Golden',
    },
    {
      url: '/p5/personae',
      title: 'Persona 5',
    },
    {
      url: '/p5r/personae',
      title: 'Persona 5 Royal',
    },
    {
      url: '/settings',
      title: 'App Settings',
    },
    {
      url: '/reference',
      title: 'Reference',
    },
  ];

  delayedClose(): void {
    setTimeout(() => this.sideNav.close(), 300)
  }
}
