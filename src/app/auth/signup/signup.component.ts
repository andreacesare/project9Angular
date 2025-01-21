import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

function equalValue(control:AbstractControl) {
  const password=control.get('password')?.value;
  const confPassword=control.get('confPassword')?.value;
  if(password===confPassword){
    return null;
  }
  return {x:true}
}
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule
  ]
})

export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords:new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },[equalValue]),

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),

    address:new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),

    role: new FormControl('student', [Validators.required]),
    source:new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree:new FormControl(false,[Validators.required]),
  })

  onSubmit() {
    if(this.form.invalid){console.log('invalid bro'); return;}
    console.log(this.form);
  }
  onReset() {
    this.form.reset();
  }
}
