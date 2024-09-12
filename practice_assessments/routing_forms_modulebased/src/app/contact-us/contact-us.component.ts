import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup
  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name:["",[Validators.required]],
      message:["msg",[Validators.required,Validators.minLength(10)]]
    })
  }

  get name(){
    return this.contactForm.get("name")
  }

  get message(){
    return this.contactForm.get("message")
  }

  getMessageErrors(){
    if (this.message?.hasError("required")){
      return "Message required"
    } else{
      return "Message should have atleast 10 chars"
    }
  }

  onSubmit(){
    console.log("submitted");
  }

}
