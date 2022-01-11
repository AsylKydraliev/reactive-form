import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneValidator } from '../shared/phone-validator.directive';
import { Application } from '../shared/application.model';
import { ApplicationService } from '../shared/application.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userForm!: FormGroup;
  count = 300;
  comments = 300;
  applicationId = '';
  application: Application | null = null;

  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required, phoneValidator,
      ]),
      workOrStudy: new FormControl('',Validators.required),
      gender: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      skills: new FormArray([]),
      comments: new FormControl('', [
        Validators.required,
        Validators.maxLength(300)
      ]),
    });

    this.route.data.subscribe(data => {
      this.application = <Application | null>data.application;
      if(this.application){
        this.applicationId = this.application.id;
        this.setFormValue({
          name: this.application.name,
          surname: this.application.surname,
          patronymic: this.application.patronymic,
          phoneNumber: this.application.phoneNumber,
          workOrStudy: this.application.workOrStudy,
          gender: this.application.gender,
          size: this.application.size,
          skills: [],
          comments: this.application.comments
        })
      }else {
        this.applicationId = '';
        this.setFormValue({
          name: '',
          surname: '',
          patronymic: '',
          phoneNumber: '',
          workOrStudy: '',
          gender: '',
          size: '',
          skills: [],
          comments: ''
        })
      }
    })
  }

  setFormValue(value: {[key: string]: any}) {
    setTimeout(() => {
      this.userForm.setValue(value);
    })
  }

  onSubmit() {
    const id = this.applicationId || Math.random().toString();
    const application = new Application(
      id,
      this.userForm.value.name,
      this.userForm.value.surname,
      this.userForm.value.patronymic,
      this.userForm.value.phoneNumber,
      this.userForm.value.workOrStudy,
      this.userForm.value.gender,
      this.userForm.value.size,
      this.userForm.value.skills,
      this.userForm.value.comments,
    )

    if(this.applicationId) {
      this.applicationService.editData(application).subscribe();
      this.applicationService.getApplications();
      void this.router.navigate(['/applications']);
    }else {
      this.applicationService.postApplication(application);
      void this.router.navigate(['/application']);
    }
  }

  fieldHasError(fieldName: string, errorType: string){
    const field = this.userForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  skillsHasError(fieldName: string, errorType: string){
    const skills = <FormArray>this.userForm.get('skills');
    const field = skills.controls[0].get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  addSkill() {
    let skill!: string;
    let level!: string;
    if (this.application?.skills.length) {
      this.application.skills.forEach(item => {
        skill = item.skill;
        level = item.level;
      })
    } else if(this.application === null){
      skill = '';
      level = '';
    }
    const skills = <FormArray>this.userForm.get('skills');
    const skillGroup = new FormGroup({
      skill: new FormControl(`${skill}`, Validators.required),
      level: new FormControl(`${level}`, Validators.required),
    })
    skills.push(skillGroup);
  }

  getSkillControls() {
    const skills = <FormArray>this.userForm.get('skills');
    return skills.controls;
  }

  onCharactersCount() {
    this.comments = this.count - this.userForm.value.comments.length;
  }
}
