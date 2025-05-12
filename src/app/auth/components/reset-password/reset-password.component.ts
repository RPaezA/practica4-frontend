import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  resetPassword() {
    const token = this.route.snapshot.queryParams['token'];
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(token, this.resetPasswordForm.value.newPassword)
        .subscribe({
          next: (response) => {
            alert("error response.message");
            this.router.navigate(['/login']); // Redirige al login tras éxito
          },
          error: (err) => {
            alert('Error: ' + (err.error?.message || 'No se pudo cambiar la contraseña.'));
          }
        });
    }
  }
}
