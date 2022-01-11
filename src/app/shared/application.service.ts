import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from './application.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  applications: Application[] | null = null;
  applicationsChange = new Subject<Application[]>();
  getLoading = new Subject<boolean>();
  deleteLoading = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  postApplication(application: Application){
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/applications.json', application)
      .subscribe()
  }

  getApplications(){
    this.getLoading.next(true);
    this.http.get<{[id: string]:Application}>
    ('https://app-blog-f76a2-default-rtdb.firebaseio.com/applications.json').pipe(
      map(result => {
        if(result === null){
          return [];
        }
        return Object.keys(result).map(id => {
          const data = result[id];
          return new Application(
            id,
            data.name,
            data.surname,
            data.patronymic,
            data.phoneNumber,
            data.workOrStudy,
            data.gender,
            data.size,
            data.skills,
            data.comments
          );
        })
      }))
      .subscribe(applications => {
        this.applications = [];
        this.applications = applications;
        this.applicationsChange.next(this.applications.slice());
        this.getLoading.next(false);
      }, () => {
        this.getLoading.next(false);
      })
  }

  getApplication(id: string){
    return this.http.get<Application | null>
    (`https://app-blog-f76a2-default-rtdb.firebaseio.com/applications/${id}.json`)
      .pipe(map(result => {
        if(!result) return  null;
        return new Application(
          id,
          result.name,
          result.surname,
          result.patronymic,
          result.phoneNumber,
          result.workOrStudy,
          result.gender,
          result.size,
          result.skills,
          result.comments
        );
      }))
  }

  editData(application: Application) {
    const body = {
      name: application.name,
      surname: application.surname,
      patronymic: application.patronymic,
      phoneNumber: application.phoneNumber,
      workOrStudy: application.workOrStudy,
      gender: application.gender,
      size: application.size,
      skills: application.skills,
      comments: application.comments
    }
    return this.http.put(`https://app-blog-f76a2-default-rtdb.firebaseio.com/applications/${application.id}.json`, body)
      .pipe();
  }

  removeApplication(id: string) {
    this.deleteLoading.next(true);
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/applications/${id}.json`)
      .subscribe(() => {
          this.getApplications();
          this.deleteLoading.next(false);
        });
  }
}
