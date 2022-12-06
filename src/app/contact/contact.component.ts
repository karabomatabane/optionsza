import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  FormData: FormGroup;

  constructor(private builder: FormBuilder, private contact: ContactService) { }

  ngOnInit() {
    this.FormData = this.builder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
    phoneNumber: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])]),
    message: new FormControl('', [Validators.required]),
    })
  }

  get formControls() {
    return this.FormData.controls;
  }

  onSubmit(FormData) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm'
    console.log(response)
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
  }
}
