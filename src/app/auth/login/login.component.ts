// import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
// import {FormsModule, NgForm} from "@angular/forms";
// import {debounceTime} from "rxjs";
//
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports: [
//     FormsModule
//   ]
// })
// export class LoginComponent {
//
//   private form=viewChild<NgForm>('form');
//   private destroyRef=inject(DestroyRef);
//
//   constructor() {
//     afterNextRender(()=>{
//       const savedForm=window.localStorage.getItem('login');
//       if(savedForm){
//         const loadEmail=JSON.parse(savedForm);
//         const savedEmail=loadEmail.email;
//         setTimeout(()=>{this.form()!.controls['email'].setValue(savedEmail),1});
//
//       }
//       const sub =this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
//         next:val=>window.localStorage.setItem('login',JSON.stringify({email:val.email}))
//       });
//       this.destroyRef.onDestroy(()=>sub?.unsubscribe());
//     });
//   }
//
//   onSubmit(formData:NgForm){
//
//     const entEmail=formData.form.value.email;
//     const entPassword=formData.form.value.password;
//     console.log(formData);
//     formData.form.reset();
//   }
// }

import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {
  private destroyRef=inject(DestroyRef);
  form=new FormGroup({
    email:new FormControl('',{
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  get emailInvalid(){
    return( this.form.controls.email.touched &&
          this.form.controls.email.invalid &&
      this.form.controls.email.dirty
    );
  }
  get passInvalid(){
    return( this.form.controls.password.touched &&
      this.form.controls.password.invalid &&
      this.form.controls.password.dirty
    );
  }

  ngOnInit(){
    const sub=this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {window.localStorage.setItem("email", JSON.stringify(value.email));},
    })
    this.destroyRef.onDestroy(()=>sub.unsubscribe());
  }

  onSubmit(){

  }
}
