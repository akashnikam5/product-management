import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  login() {


    if (this.loginForm && this.loginForm.valid) {
      // Prepare data to send
      const formData = {
        "login": true,
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }

      this.loginService.login(formData).subscribe(
        (response) => {
          localStorage.setItem('isLoggedIn', 'true');
          // Handle successful response (e.g., redirect to login page)
          this.toastr.success('Login successful!', 'Success');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log(error);
          // Handle error (e.g., display error message)
          this.toastr.error('Error logging In', 'Error');
          console.error('Error logging In:', error);
          
        }
      );
    } else if (this.loginForm) {
    this.toastr.error('Error logging In', 'Error');
      this.loginForm.markAllAsTouched();
    }

  }


}
