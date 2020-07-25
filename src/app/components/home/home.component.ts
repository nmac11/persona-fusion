import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  links = [{
    title: 'Persona 3 Portable',
    url: '/p3p',
    platform: 'PSP',
  },{
    title: 'Persona 3 FES: The Journey',
    url: '/p3fes',
    platform: 'PS2',
  },{
    title: 'Persona 3 FES: The Answer',
    url: '/p3ans',
    platform: 'PS2',
  },{
    title: 'Persona 4',
    url: '/p4',
    platform: 'PS2',
  },{
    title: 'Persona 4 Golden',
    url: '/p4g',
    platform: 'PS Vita / Windows',
  },{
    title: 'Persona 5',
    url: '/p5',
    platform: 'PS3 / PS4',
  },{
    title: 'Persona 5 Royal',
    url: '/p5r',
    platform: 'PS4',
  }];

  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Home');
  }

  ngOnInit(): void {}
}
