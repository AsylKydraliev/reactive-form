import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './application.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundcomponent } from './not-found.component';
import { PhoneValidatorDirective } from './shared/phone-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ApplicationsComponent,
    ApplicationComponent,
    NotFoundcomponent,
    PhoneValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
