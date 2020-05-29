import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shared-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.css'],
})
export class NavContentComponent implements OnInit {
  title: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.data.title;
  }
}
