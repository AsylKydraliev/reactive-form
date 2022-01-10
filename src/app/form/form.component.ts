import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneValidator } from '../shared/phone-validator.directive';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userForm!: FormGroup;
  constructor() { }

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
  }

  onSubmit() {
    console.log(this.userForm);
  }

  fieldHasError(fieldName: string, errorType: string){
    const field = this.userForm.get(fieldName);
    console.log(field?.touched, field?.errors)
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  addSkill() {
    const skills = <FormArray>this.userForm.get('skills');
    const skillGroup = new FormGroup({
      skill: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
    })
    skills.push(skillGroup);
  }

  getSkillControls() {
    const skills = <FormArray>this.userForm.get('skills');
    return skills.controls;
  }
}
