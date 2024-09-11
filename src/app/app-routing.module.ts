import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { CreationOperatorsComponent } from './creation-operators/creation-operators.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'creation-operators', component: CreationOperatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
