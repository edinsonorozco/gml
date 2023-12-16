import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ClientsTableComponent } from './modules/clients/clients-table/clients-table.component';

const routes: Routes = [  
  {path: 'clients', component: ClientsTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
