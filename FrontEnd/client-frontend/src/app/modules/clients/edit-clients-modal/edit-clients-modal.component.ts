import {Component,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Clients} from "../../../core/entities/clients";
import {ClientsService} from "../../../core/services/clients.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-clients-modal',
  templateUrl: './edit-clients-modal.component.html',
  styleUrls: ['./edit-clients-modal.component.css']
})
export class EditClientsModalComponent {
  clientsForm: FormGroup;
  submited: boolean = false;
  currentClients: Clients;

  constructor(public dialogRef: MatDialogRef<EditClientsModalComponent>,
              private formBuilder: FormBuilder,
              private clientService: ClientsService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public client: Clients) {
      this.currentClients = client;
      this.clientsForm = this.formBuilder.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      dataAdded: ['', Validators.required]
    });    
  }

  ngOnInit() {
    this.clientsForm.patchValue({
      sharedKey: this.currentClients.sharedKey,
      businessId: this.currentClients.businessId,
      email: this.currentClients.email,
      phone: this.currentClients.phone,
      dataAdded: this.currentClients.dataAdded      
    })
    
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  aceptar() {
    this.submited = true;
    this.clientsForm.markAllAsTouched();
    if (this.clientsForm.invalid) {
      return;
    }

    const clients: Clients = new Clients();
    clients.sharedKey = this.f['sharedKey'].value;
    clients.businessId = this.f['businessId'].value;
    clients.email = this.f['email'].value;
    clients.phone = this.f['phone'].value;
    clients.dataAdded = this.f['dataAdded'].value;
    this.clientService.updateClients(clients).subscribe(response => {
      this.openSnackBar(response.message, 3000, 'success');
      this.dialogRef.close(response.objectResponse as Clients);
    }, error => {
      this.openSnackBar(error.error.message, 3000, 'warning');
    });
  }

  private openSnackBar(mensaje: string, duracion: number, color: string): void {
    this.snackBar.open(mensaje, 'Ok', {
      duration: duracion,
      horizontalPosition: `center`,
      verticalPosition: `top`,
      panelClass: [color]
    });
  }

  validateRequired(control: AbstractControl) {
    return control.hasError('required') && (control.touched || this.submited);
  }

  get f() {
    return this.clientsForm.controls;
  }
}
