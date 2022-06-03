import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingDetailsRoutingModule } from './billing-details-routing.module';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { PrimeModule } from 'src/app/shared/prime.module';

@NgModule({
  declarations: [
    BillingDetailsComponent
  ],
  imports: [
    CommonModule,
    BillingDetailsRoutingModule,
    PrimeModule
  ]
})
export class BillingDetailsModule { }
