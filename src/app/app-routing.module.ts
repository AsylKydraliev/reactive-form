import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ApplicationComponent } from './application.component';
import { ApplicationsComponent } from './applications/applications.component';
import { NotFoundcomponent } from './not-found.component';
import { ResolverService } from './applications/resolver.service';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'application', component: ApplicationComponent},
  {path: 'applications', component: ApplicationsComponent},
  {path: 'applications/:id', component: FormComponent, resolve: {application: ResolverService}},
  {path: '**', component: NotFoundcomponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
