import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false; // Estado inicial: contraseña oculta

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alterna entre true y false
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.registroConNest(this.registerForm.value).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);
          this.alerta("Creado","¡El usuario se creó con éxito!","success")
          this.router.navigate(['/auth/login'])
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          this.alerta("Error al crear usuario","¡Verifica los datos!","error")
          this.router.navigate(['/auth/login'])
        }
      );
    } else {
      console.error('Formulario no válido');
      this.alerta("Por favor, complete todos los campos correctamente","¡Verifica los datos!","error")
      
    }
  }
  alerta(title:string, text:string, icon:'success'|'error'|'info'|'question'){
      Swal.fire({title,text,icon});
    }

    
}

