import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css'],
})
export class ReferenceComponent implements OnInit {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Reference');
  }

  ngOnInit(): void {}
}
