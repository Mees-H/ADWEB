import {Component, inject} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ErrorComponent} from "../error/error.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ErrorComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
    this.register(rawForm.password, rawForm.email);
  }
  register(password: string, email: string){
    this.authService.register(email, password).subscribe({
      next: () => this.location.back(),
      error: (error: any) => this.errorMessages.push(error.message)
    });
  }
}
