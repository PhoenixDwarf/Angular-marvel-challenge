import { Component, OnInit } from '@angular/core';
import { SuperheroesService } from './services/superheroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MarvelChallenge';
  
  constructor (private superheroesService:SuperheroesService){}

  ngOnInit(): void {
    // this.superheroesService.getAllSuperHeroes();
  }
}
