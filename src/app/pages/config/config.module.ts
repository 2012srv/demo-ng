import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { NetworksComponent } from './networks/networks.component';
import { SquadsComponent } from './squads/squads.component';


@NgModule({
  declarations: [
    NetworksComponent,
    SquadsComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
