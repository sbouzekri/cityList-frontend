import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'city',
        loadChildren: () => import('./city/city.module').then(m => m.CityModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
