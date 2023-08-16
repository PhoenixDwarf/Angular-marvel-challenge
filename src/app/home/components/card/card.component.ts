import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SuperHero } from 'src/app/interfaces/marvel-interface';
import { ModalComponent } from '../modal/modal.component';
import { Result } from '../../../interfaces/marvel-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [DialogService]
})
export class CardComponent implements OnInit {

  @Input() heroe!:SuperHero;
  @Input() heroesArray!:Result[];
  @Input() searchBy!:string | undefined;

  constructor(public dialogService: DialogService) { 
  }

  ngOnInit(): void {
  }

  show(comicUrl:string) {
    const secureUrl = comicUrl.slice(0,4) + 's' + comicUrl.slice(4);
    const ref = this.dialogService.open(ModalComponent, {
        width: 'auto',
        dismissableMask: true,
        data: {
          comicUrl:secureUrl
        },
        styleClass: 'primeDialog'
    });
  }
}
