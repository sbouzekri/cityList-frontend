import { NgModule } from '@angular/core';
import {CityListComponent} from "./list/city-list.component";
import {CityUpdateComponent} from "./update/city-update.component";
import {CityRoutingModule} from "./routing/city-routing.module";
import {EntityModule} from "../entity.module";

@NgModule({
  imports: [EntityModule, CityRoutingModule],
  declarations: [CityListComponent, CityUpdateComponent],
})
export class CityModule {}
