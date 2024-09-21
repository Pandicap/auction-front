import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {
    this.registrationForm = fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator('password', 'confirmPassword'),
      },
    );
  }

  passwordMatchValidator(pass: string, confirmPass: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(pass);
      const matchingControl = abstractControl.get(confirmPass);

      if (control?.pristine || matchingControl?.pristine) {
        return null;
      }

      if (control?.value !== matchingControl?.value) {
        const error = { passwordMatch: 'Passwords do not match!' };
        matchingControl?.setErrors(error);
        return error;
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  signup() {
    const signupData = this.registrationForm.getRawValue();
    delete signupData.confirmPassword;
    this.authService.signup(signupData).subscribe((res: any) => {
      this.localStorageService.setItem('userToken', res.access_token);
      this.router.navigate(['/auction']);
    });
  }
}
