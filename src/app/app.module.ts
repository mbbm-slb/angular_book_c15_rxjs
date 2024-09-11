import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { CreationOperatorsComponent } from './creation-operators/creation-operators.component';
import { HigherOrderOperatorsComponent } from './higher-order-operators/higher-order-operators.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    CreationOperatorsComponent,
    HigherOrderOperatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
