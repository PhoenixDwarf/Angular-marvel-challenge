import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Result } from 'src/app/interfaces/marvel-interface';
import { SuperheroesService } from 'src/app/services/superheroes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  currentComic!:Result;
  comicUrl!:string;
  showSpinner:boolean = true;
  disableBtn:boolean = false;
  isComicAlreadyFav?:Result;
  @Output()favsArray = new EventEmitter<Result>()

  constructor(private superheroesService:SuperheroesService,
              public config: DynamicDialogConfig,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.comicUrl = this.config.data.comicUrl;
    this.superheroesService.getComics(this.comicUrl).subscribe({
      next: (res) => {
        this.currentComic = res.data.results[0];
        this.isComicAlreadyFav = this.superheroesService.favsArray.find( fav => fav?.id === this.currentComic.id);
        if(this.isComicAlreadyFav != undefined){
          this.disableBtn = true;
        }
        this.showSpinner = false;  
      },
      error: err => console.error('Error:' + err)
    });
  }

  addFavourite( comic:Result ){

    if(this.disableBtn === false){
      this.superheroesService.favsArray.push(comic);
      this.disableBtn = true;
      this.messageService.add({severity:'success', summary: 'Success', detail: `"${comic.title}" was added to favourites`});
    }
    else{
      return;
    }
  }
}
