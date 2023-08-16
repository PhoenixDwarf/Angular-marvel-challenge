import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { HomeRoutingModule } from './home.routing.module';
import { PrimengModule } from '../shared/primeng/primeng.module';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule
  ]
})
export class HomeModule { }
