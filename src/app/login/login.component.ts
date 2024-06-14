import {Component, inject} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorComponent} from "../error/error.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ErrorComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  errorMessages: string[] = [];
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private location: Location){}

  submitForm(){
    const rawForm = this.form.getRawValue();
    this.login(rawForm.password, rawForm.email);
  }
  login(password: string, email: string){
    this.authService.login(email, password).subscribe({
      next: () => this.location.back(),
      error: (error: any) => this.errorMessages.push(error.message)
    });
  }
}
