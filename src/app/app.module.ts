import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterComponent } from './pages/character/character.component';
import { PrimengModule } from './shared/primeng/primeng.module';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
