import {Component, inject} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);

  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  submitForm(){
    const rawForm = this.form.getRawValue();
    this.register(rawForm.password, rawForm.email);
  }
  register(password: string, email: string){
    this.authService.register(email, password).subscribe();
  }
}
