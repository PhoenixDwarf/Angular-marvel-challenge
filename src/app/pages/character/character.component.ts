import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/interfaces/marvel-interface';
import { SuperheroesService } from 'src/app/services/superheroes.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  heroID!:number;
  currentHero:any;
  showSpinner!:boolean;
  constructor(private route: ActivatedRoute,
              private superheroesService:SuperheroesService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.heroID = Number(params['id']);
      }
    });

    this.superheroesService.getSuperHeroById(this.heroID).subscribe(
      res => {
        this.currentHero = res.data.results[0];
      }
    );
  }
  ngOnDestroy(): void {
    this.superheroesService.gotAllHeroes$.unsubscribe();
  }
}
