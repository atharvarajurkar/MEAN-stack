import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true

  constructor(private fb: FormBuilder,private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]]
    })
  }

  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter an email'
    } else if (this.email?.hasError('email')) {
      return 'Not a valid email'
    } else {
      return ''
    }
  }

  getPasswordErrorMessage() {
    
    if (this.password?.hasError('required')) {
      return 'You must enter a password'
    } else if (this.password?.hasError('minlength')) {
      return 'Please enter atleast 6 chars'
    } else {
      return ''
    }
  }

  onSignIn(){
    if (this.loginForm.valid){
      this.router.navigate(['/movieList/movies']);
    }
  }

  onSignUpClick(){
    this.router.navigate(['../register/step1']);
  }

  onSubmit(){
    if (this.loginForm.valid){
      this.router.navigate(['/movieList/movies']);
    }
  }
}
