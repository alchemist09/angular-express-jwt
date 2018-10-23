import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public contactForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("",
      [Validators.required,
       Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')]
    ),
    phone: new FormControl("", [Validators.pattern('[0-9]+')]),
    city: new FormControl(),
    country: new FormControl(),
    title: new FormControl()
  });

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  onSubmit() {
    console.log(this.contactForm.value);
  }

}
