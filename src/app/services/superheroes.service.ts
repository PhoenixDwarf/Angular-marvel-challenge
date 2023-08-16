import { Injectable, EventEmitter } from '@angular/core';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';
import { MarvelData, Result } from '../interfaces/marvel-interface';
import { merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperheroesService {

  base_url = 'https://gateway.marvel.com:443/v1/public/characters';
  publicKey = '0595a91eaa2ad0dd82034acc951ad531';
  privateKey ='40fb43aeab91af3fad83f94b6f69a03d18444fdb';
  ts = new Date().getTime();
  strHash = this.ts+this.privateKey+this.publicKey;
  md5 = new Md5();
  hash = this.md5.appendStr(this.strHash).end(); 
  favsArray: Result[] = [];
  temporalArray: Result[] = [];
  gotAllHeroes$ = new EventEmitter<boolean>();

  constructor(private http:HttpClient) { }

  getUrl(offset:number, orderBy?:string, name?:string):string{
    if(name){
      return `${this.base_url}?orderBy=${orderBy}&nameStartsWith=${name}&offset=${offset}&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`
    }else{
      return `${this.base_url}?orderBy=${orderBy}&limit=10&offset=${offset}&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    } 
  }

  getComics(comicUrl:string){
    return this.http.get<MarvelData>(`${comicUrl}?apikey=${this.publicKey}&ts=${this.ts}&hash=${this.hash}`);
  }
  
  getSuperHeroes(offset:number, orderBy?:string, name?:string, ){
    return this.http.get<MarvelData>(this.getUrl(offset, orderBy, name));
  } 

  getSuperHeroById(id:number){
    return this.http.get<MarvelData>(`${this.base_url}/${id}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`);
  }

  deleteFavComic(comic:Result){
    const index = this.favsArray.indexOf(comic);
    if (index > -1) {
      this.favsArray.splice(index, 1);
    }
  }
}
