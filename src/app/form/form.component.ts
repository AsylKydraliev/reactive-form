import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      phoneNumber: new FormControl('', [Validators.required]),
      workOrStudy: new FormControl('',Validators.required),
      gender: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.userForm);
  }

  fieldHasError(fieldName: string, errorType: string){
    const field = this.userForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }
}
