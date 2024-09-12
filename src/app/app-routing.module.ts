import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { CreationOperatorsComponent } from './creation-operators/creation-operators.component';
import { CombinationOperatorsComponent } from './combination-operators/combination-operators.component';
import { HigherOrderOperatorsComponent } from './higher-order-operators/higher-order-operators.component';
import { TransformationOperatorsComponent } from './transformation-operators/transformation-operators.component';
const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'creation-operators', component: CreationOperatorsComponent },
  { path: 'combination-operators', component: CombinationOperatorsComponent },
  { path: 'higher-order-operators', component: HigherOrderOperatorsComponent },
  { path: 'transformation-operators', component: TransformationOperatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
