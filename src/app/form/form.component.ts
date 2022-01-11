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
  clickAdd = false;
  applicationUpdate = false;
  editCount = 0;

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
        this.applicationUpdate = true;
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

  skillsHasError(fieldName: string, errorType: string, index: number){
    const skills = <FormArray>this.userForm.get('skills');
    const field = skills.controls[index].get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  getSkillFormGroup(){
    const skills = <FormArray>this.userForm.get('skills');
    const skillGroup = new FormGroup({
      skill: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
    })
    skills.push(skillGroup);
  }

  addSkill() {
    this.clickAdd = true;
    if (this.applicationUpdate) {
      if (this.application?.skills.length !== this.editCount) {
        this.application?.skills.forEach(item => {
          const skills = <FormArray>this.userForm.get('skills');
          const skillGroup = new FormGroup({
            skill: new FormControl(`${item.skill}`, Validators.required),
            level: new FormControl(`${item.level}`, Validators.required),
          })
          skills.push(skillGroup);
          this.editCount = <number>this.application?.skills.length;
        })
      } else{
        this.getSkillFormGroup();
      }
    } else {
      this.getSkillFormGroup();
    }
  }

  getSkillControls() {
    const skills = <FormArray>this.userForm.get('skills');
    return skills.controls;
  }

  onCharactersCount() {
    this.comments = this.count - this.userForm.value.comments.length;
  }
}
