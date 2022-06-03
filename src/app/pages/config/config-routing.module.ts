import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworksComponent } from './networks/networks.component';
import { SquadsComponent } from './squads/squads.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'networks',
    pathMatch: 'full'
  },
  {
    path: 'networks',
    component: NetworksComponent
  },
  {
    path: 'squads',
    component: SquadsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
