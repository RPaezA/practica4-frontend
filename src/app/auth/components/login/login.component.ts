import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si estamos en el navegador y si hay un correo guardado
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('rememberMe');
      if (savedEmail) {
        this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
      }
    }
  }

  onLogin(): void {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined') {
      if (this.loginForm.value.rememberMe) {
        // Si el usuario seleccionó "Recuérdame", guardar el correo en localStorage
        localStorage.setItem('rememberMe', this.loginForm.value.email!);
      } else {
        // Si no, eliminar el correo guardado
        localStorage.removeItem('rememberMe');
      }
    }

    // Llamar al servicio de autenticación para procesar el login
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
