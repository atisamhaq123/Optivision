import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-similarity',
  templateUrl: './similarity.component.html',
  styleUrls: ['./similarity.component.css']
})
export class SimilarityComponent {
  contactForm: FormGroup; // Define the form group
  message:any;
  sendEmail(name:any,email:any,message:any) {
    emailjs.send('service_jcpc2g9', 'template_5px2nls', {
      from_name:name,
      from_email:email,
      message: message,
    }, 'gCNcmLbwjN_EzZts1')
    .then((response: EmailJSResponseStatus) => {
      console.log('Email sent:', response);
      this.message="Email sent successfully"
    })
    .catch((error) => {
      console.error('Email error:', error);
      this.message="Network Error"
    });
  }
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required], // Name field with required validator
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validators
      message: ['', Validators.required], // Message field with required validator
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.contactForm.valid) {
      // Form is valid, proceed with submission
      console.log(this.contactForm.value.name);
      this.sendEmail(this.contactForm.value.name,this.contactForm.value.email,this.contactForm.value.message)
    } else {
      // Form is invalid, handle the error or show validation messages
    }
  }
}
