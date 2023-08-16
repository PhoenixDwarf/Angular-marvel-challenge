import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Result } from '../interfaces/marvel-interface';
import { SuperheroesService } from '../services/superheroes.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroesArray:Result[] = [];
  sortOptions: SelectItem[] = [];
  favsArray: Result[] = [];
  searchBy:string | undefined;
  loading:boolean = false;
  totalRecords!:number;
  debouncer:Subject<string> = new Subject();
  orderBy:string ='name';

  constructor(private superheroesService:SuperheroesService,
              private primengConfig: PrimeNGConfig,
              private messageService: MessageService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(500)
      )
    .subscribe( valor => {
      this.loadData(0,this.orderBy,valor);
    });

    this.favsArray = this.superheroesService.favsArray;

    this.sortOptions = [
      {label: 'Name ↑', value: 'name'},
      {label: 'Name ↓', value: '-name'},
      {label: 'Date ↑', value: 'modified'},
      {label: 'Date ↓', value: '-modified'},      
    ];

    this.primengConfig.ripple = true;

    if(localStorage.getItem('localSortField') == null){
      this.orderBy = 'name';
    }
    else{
      this.orderBy = String(localStorage.getItem('localSortField'));
    }
    
    const routParam = this.route.snapshot.queryParamMap.get('searchBy');
    if(routParam != null){
      this.searchBy = routParam;
    }
  }

  onSortChange(event:any) {
    let value = event.value;
    console.log(value);
    this.orderBy = value;
    this.loadData(0, this.orderBy, this.searchBy);
    localStorage.setItem('localSortField', this.orderBy);

  }

  deleteFavComic(comic:Result){
    this.superheroesService.deleteFavComic(comic);
    this.messageService.add({severity:'success', summary: 'Success', detail: `"${comic.title}" was removed from favourites`});
  }

  loadData(offset:number, orderBy?:string, name?:string){
    if(name){
      this.searchBy = name;
    }
    this.loading = true;
    this.superheroesService.getSuperHeroes(offset, orderBy, this.searchBy).subscribe({
      next: (res) => {
        this.totalRecords = res.data.total;
        this.heroesArray = res.data.results;
        this.superheroesService.temporalArray = this.heroesArray;
        this.loading = false;
      }
    });
  }
  pressedKey(name:string){
    this.debouncer.next(name);
  }
}
