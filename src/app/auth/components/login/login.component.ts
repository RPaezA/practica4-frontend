import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),


  });

  showPassword: boolean = false; // Estado inicial: contraseña oculta

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alterna entre true y false
  }

  ngOnInit(): void {
    // Verificar si estamos en el navegador y si hay un correo guardado
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('rememberMeEmail');
      const savedPassword = localStorage.getItem('rememberMePassword');

      if (savedEmail && savedPassword) {
        this.loginForm.patchValue({ email: savedEmail, password: savedPassword, rememberMe: true });
      }
    }
  }

  onLogin(): void {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined') {
      if (this.loginForm.value.rememberMe) {
        // Si el usuario seleccionó "Recuérdame", guardar el correo y la contraseña en localStorage
        localStorage.setItem('rememberMeEmail', this.loginForm.value.email!);
        localStorage.setItem('rememberMePassword', this.loginForm.value.password!);
      } else {
        // Si no, eliminar el correo y la contraseña guardados
        localStorage.removeItem('rememberMeEmail');
        localStorage.removeItem('rememberMePassword');
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
        this.alerta("Error al iniciar sesión", "¡Verifica los datos!", "error")
        this.loginForm.reset();
        this.router.navigate(['/auth/login'])

      }
    );
  }

  funIngresar() {
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem("access_token", res.token)
        this.router.navigate(["/admin"])
      },
      (error) => {
        console.log(error)
        this.alerta("Error al iniciar sesión", "¡Verifica los datos!", "error")
        this.loginForm.reset();
        this.router.navigate(['/auth/login'])

      }
    )
    //alert("Ingresando...")
  }

  onForgotPassword() {
    this.router.navigate(['/auth/forgot-password']); // Redirige a la pantalla de recuperación
  }

  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title, text, icon });
  }

}
