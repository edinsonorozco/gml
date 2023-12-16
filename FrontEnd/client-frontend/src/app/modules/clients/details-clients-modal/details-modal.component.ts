import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Clients} from "../../../core/entities/clients";

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {

  currentClients: Clients;

  constructor(public dialogRef: MatDialogRef<DetailsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public client: Clients) {
    this.currentClients = client;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  viewSubjectRegister(): void {
    this.dialogRef.close(this.currentClients.sharedKey);
  }
}
