import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Result } from 'src/app/interfaces/marvel-interface';
import { SuperheroesService } from 'src/app/services/superheroes.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favsArray: Result[] = [];

  constructor( private superheroesService:SuperheroesService,
               private messageService:MessageService) { }

  ngOnInit(): void {
    this.favsArray = this.superheroesService.favsArray;
  }

  deleteFavComic(comic:Result){
    this.superheroesService.deleteFavComic(comic);
    this.messageService.add({severity:'success', summary: 'Success', detail: `"${comic.title}" was removed from favourites`});
  }
}
