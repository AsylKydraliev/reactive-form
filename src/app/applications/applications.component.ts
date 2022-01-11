import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Application } from '../shared/application.model';
import { ApplicationService } from '../shared/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  applications!: Application[];
  applicationsSubscription!: Subscription;
  loadingSubscription!: Subscription;
  deleteSubscription!: Subscription;
  loading = false;
  deleteLoading = false;
  deleteId = '';

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.applicationsSubscription = this.applicationService.applicationsChange.subscribe((applications: Application[]) => {
      this.applications = applications;
    })
    this.loadingSubscription = this.applicationService.getLoading.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    })
    this.deleteSubscription = this.applicationService.deleteLoading.subscribe((isDelete: boolean) => {
      this.deleteLoading = isDelete;
    })
    this.applicationService.getApplications();
  }

  onRemove(id: string) {
    this.deleteId = id;
    this.applicationService.removeApplication(id);
  }

  ngOnDestroy(){
    this.applicationsSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

}
