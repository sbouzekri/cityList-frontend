import {RouterModule, Routes} from "@angular/router";
import {CityListComponent} from "../list/city-list.component";
import {CityUpdateComponent} from "../update/city-update.component";
import {NgModule} from "@angular/core";


const cityRoute: Routes = [
  {
    path: '',
    component: CityListComponent,
  },
  {
    path: ':id/edit',
    component: CityUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(cityRoute)],
  exports: [RouterModule],
})
export class CityRoutingModule {}
