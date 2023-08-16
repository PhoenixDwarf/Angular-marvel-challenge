import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    PanelModule,
    FormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    RippleModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    PanelModule,
    FormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    RippleModule,
    ToastModule
  ]
})
export class PrimengModule { }
