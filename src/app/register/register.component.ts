import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,
      FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      phoneNumber: ['',[Validators.pattern('^[- +()0-9]+$'),Validators.required]],
      address: ['',[Validators.required]]
    });
  }
  onSubmit(){
    if(this.registerForm.valid){
      const formData = this.registerForm.value;
      this.authService.register(formData).subscribe({
        next: (res) => {
          console.log('Registration successful',res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.registerForm.markAllAsTouched();
          console.error("Registration failed",err);
        }
      })
    }
  }
  isInvalid(controlName: string):boolean|undefined{
    const control = this.registerForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }
  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Trường này là bắt buộc';
    }
    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Cần ít nhất ${requiredLength} ký tự`;
    }
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Tối đa ${maxLength} ký tự`;
    }
    if (control.hasError('email')) {
      return 'Email không hợp lệ';
    }
    if (control.hasError('pattern')) {
      return 'Định dạng không hợp lệ';
    }
    return '';
  }
}


