import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  navLinks = [{
    url: '',
    title: 'Home'
  },
  {
    url: '/p3p',
    title: 'Persona 3 Portable'
  },
  {
    url: '/p3fes',
    title: 'Persona 3 FES'
  },
  {
    url: '/p4',
    title: 'Persona 4'
  },
  {
    url: '/p4g',
    title: 'Persona 4 Golden'
  },
  {
    url: '/p5',
    title: 'Persona 5'
  },
  {
    url: '/settings',
    title: 'Settings'
  }];
}
