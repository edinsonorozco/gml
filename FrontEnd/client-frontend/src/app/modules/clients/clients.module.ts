import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsTableComponent} from './clients-table/clients-table.component';
import {MaterialModule} from "../../material/material.module";
import {MatTableModule} from "@angular/material/table";
import {UtilsModule} from "../../utils/utils.module";
import {CreateClientsModalComponent} from './create-clients-modal/create-clients-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetailsModalComponent} from './details-clients-modal/details-modal.component';
import {EditClientsModalComponent} from './edit-clients-modal/edit-clients-modal.component';

@NgModule({
  declarations: [
    ClientsTableComponent,
    CreateClientsModalComponent,
    DetailsModalComponent,
    EditClientsModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatTableModule,
    UtilsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientsModule {
}