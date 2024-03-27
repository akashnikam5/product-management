import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm && this.registrationForm.valid) {
      // Prepare data to send
      const formData = {
        "register": true,
        "email": this.registrationForm.value.email,
        "password": this.registrationForm.value.password,
        "user_name": this.registrationForm.value.username
      }

      this.registrationService.registerUser(formData).subscribe(
        (response) => {
          // Handle successful response (e.g., redirect to login page)
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          // Handle error (e.g., display error message)
          this.toastr.error('Please fill in all required fields.', 'Error');
          console.error('Error registering user:', error);
        }
      );
    } else if (this.registrationForm) {
      this.toastr.error('Please fill in all required fields.', 'Error');
      this.markFormGroupTouched(this.registrationForm);
    }

  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}



