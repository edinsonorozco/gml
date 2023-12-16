import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Clients} from "../../../core/entities/clients";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ClientsService } from 'src/app/core/services/clients.service';

@Component({
  selector: 'app-create-clients-modal',
  templateUrl: './create-clients-modal.component.html',
  styleUrls: ['./create-clients-modal.component.css']
})
export class CreateClientsModalComponent {
  clientForm: FormGroup;
  submited: boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateClientsModalComponent>,
              private formBuilder: FormBuilder,
              private clientsService: ClientsService,
              private snackBar: MatSnackBar) {
    this.clientForm = this.formBuilder.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      dataAdded: ['', Validators.required]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  aceptar() {
    this.submited = true;
    this.clientForm.markAllAsTouched();
    if (this.clientForm.invalid) {
      return;
    }

    const clients: Clients = new Clients();
    clients.sharedKey = this.f['sharedKey'].value;
    clients.businessId = this.f['businessId'].value;
    clients.email = this.f['email'].value;
    clients.phone = this.f['phone'].value;
    clients.dataAdded = this.f['dataAdded'].value;
    this.clientsService.registerClients(clients).subscribe(response => {
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
    return this.clientForm.controls;
  }
}
