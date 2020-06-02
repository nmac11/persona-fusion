import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  title: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.params.game;
  }
}
