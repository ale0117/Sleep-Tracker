import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaytimeSleepinessPage } from './daytime-sleepiness.page';

const routes: Routes = [
  {
    path: '',
    component: DaytimeSleepinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaytimeSleepinessPageRoutingModule {}
