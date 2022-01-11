import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Application } from '../shared/application.model';
import { ApplicationService } from '../shared/application.service';

@Injectable({
  providedIn: 'root',
})

export class ResolverService implements Resolve<Application>{
  constructor(private applicationService: ApplicationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Application> | Observable<never> {
    const id = <string>route.params['id'];
    return this.applicationService.getApplication(id).pipe(mergeMap(application => {
      if(application) {
        return of(application);
      }else {
        return EMPTY;
      }
    }));
  }
}
