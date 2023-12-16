import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clients} from "../entities/clients";
import {Response} from "../entities/response";

export const ipServer = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }

  public getAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(`${ipServer}/listClients`);
  }

  public registerClients(clients: Clients): Observable<Response> {
    return this.http.post<Response>(`${ipServer}/registerClients`, clients);
  }

  public deleteClients(clients: Clients): Observable<Response> {
    return this.http.post<Response>(`${ipServer}/deleteClients`, clients.sharedKey);
  }

  public updateClients(clients: Clients): Observable<Response> {
    return this.http.put<Response>(`${ipServer}/updateClients`, clients);
  }
}
