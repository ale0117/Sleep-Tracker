import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OvernightSleepPageRoutingModule } from './overnight-sleep-routing.module';

import { OvernightSleepPage } from './overnight-sleep.page';
import { DatatableModule } from '../components/datatable/datatable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatatableModule,
    OvernightSleepPageRoutingModule
  ],
  declarations: [OvernightSleepPage]
})
export class OvernightSleepPageModule {}
