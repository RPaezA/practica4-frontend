import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetLink() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value.email)
        .subscribe({
          next: (response) => {
            alert(response.message);
          },
          error: (err) => {
            alert('Error: ' + (err.error?.message || 'No se pudo enviar el correo.'));
          }
        });
    }
  }
}
