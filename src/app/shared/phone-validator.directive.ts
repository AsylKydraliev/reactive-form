import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive } from '@angular/core';

export function phoneValidator (): ValidatorFn{
  return (control: AbstractControl) : ValidationErrors | null => {
    const hasNumber = /^[+](\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{6}$/.test(control.value);

    if(hasNumber) {
      return null;
    }

    return {phoneNumber: true};
  }
}

@Directive({
  selector: '[appPhone]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PhoneValidatorDirective,
    multi: true
  }]
})
export class PhoneValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return phoneValidator()(control);
  }
}
