import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone:true,
  encapsulation:ViewEncapsulation.None,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
   registerForm!: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router,private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      phoneNumber: ['',[Validators.pattern('^[- +()0-9]+$'),Validators.required]],
      address: ['',[Validators.required]]
    });
  }
  ngOnInit(): void {
    this.registerForm.get('email')?.valueChanges.pipe(
        debounceTime(500),
        switchMap(email => this.http.get<any>(`https://localhost:7275/api/auth/check_email?email=${email}`))
      ).subscribe(res => {
        if (res.exists) {
          this.registerForm.get('email')?.setErrors({ emailTaken: true });
        }
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
      return 'Định dạng không hợp lệ';
    }
    if (control.hasError('pattern')) {
      return 'Định dạng không hợp lệ';
    }
    return '';
  }
}
