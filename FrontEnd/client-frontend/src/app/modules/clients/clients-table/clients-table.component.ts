import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientsService} from "../../../core/services/clients.service";
import {Clients} from "../../../core/entities/clients";
import {MatDialog} from "@angular/material/dialog";
import {CreateClientsModalComponent} from "../create-clients-modal/create-clients-modal.component";
import {DetailsModalComponent} from "../details-clients-modal/details-modal.component";
import {EditClientsModalComponent} from "../edit-clients-modal/edit-clients-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {
  displayedColumns: string[] = ['sharedKey', 'businessId', 'email', 'phone', 'dataAdded', 'accion'];
  dataSource!: MatTableDataSource<Clients>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clients: Clients[] = [];

  constructor(private clientsService: ClientsService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.clientsService.getAllClients().subscribe(clients => {
      this.clients = clients;
      this.dataSource = new MatTableDataSource<Clients>(this.clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addClient() {
    const dialogRef = this.matDialog.open(CreateClientsModalComponent, {
      width: '31rem',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(clients => {
      if (clients) {
        this.clients.push(clients);
        this.dataSource = new MatTableDataSource<Clients>(this.clients);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  showDetails(clients: Clients) {
    console.log(clients);
    const dialogRef = this.matDialog.open(DetailsModalComponent, {
      width: '31rem',
      data: clients,
      disableClose: true
    });
  }

  deleteClients(clients: Clients) {
    this.clientsService.deleteClients(clients).subscribe(response => {
      this.openSnackBar(response.message, 3000, 'success');
      this.ngOnInit();
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

  editarClient(clients: Clients){
    const dialogRef = this.matDialog.open(EditClientsModalComponent, {
      width: '31rem',
      data: clients,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(clients => {
      if (clients) {
        this.ngOnInit();
      }
    });
  }
}
