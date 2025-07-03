import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { UpdateUserDTO } from '../../../../model/updateUserDTO.model';

@Component({
  selector: 'app-user-admin',
  standalone:true,
  imports:[FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './user-admin.component.html'
})
export class UserAdminComponent implements OnInit {
  users: User[] = [];
  keyword: string = '';
  editingUserId: string | null = null;
  editForm!: FormGroup;
  roles: { id: number, rolename: string }[] = [];
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
    this.editForm = this.fb.group({
      id: [null],
      userName: [''],
      phoneNumber: [''],
      roleId: [1],
      gender: [''],
      address: ['']
    });
  }

  loadUsers() {
    this.userService.getAll().subscribe(res => this.users = res);
    this.userService.getAllRole().subscribe(res => this.roles = res);
  }

  search(): User[] {
    const key = this.keyword.toLowerCase();
    return this.users.filter(u =>
      u.email.toLowerCase().includes(key) ||
      u.username.toLowerCase().includes(key) ||
      u.phoneNumber.toLowerCase().includes(key) ||
      u.address.toLowerCase().includes(key)
      );
  }

  edit(user: User) {
    this.editingUserId = user.id;
    this.editForm = this.fb.group({
       userName: [user.username],
        phoneNumber: [user.phoneNumber],
        roleId: [user.roleId],
        gender: [user.gender],
    address: [user.address]
    })
  }

  save(id: string) {
    const updatedUser = this.editForm.value as UpdateUserDTO;
    this.userService.updateUser(id,updatedUser).subscribe(() => {
      this.loadUsers();
      this.editingUserId = null;
    });
  }

  cancel() {
    this.editingUserId = null;
    this.editForm.reset();
  }

  delete(id: string) {
    if (confirm('Confirm delete?')) {
      this.userService.delete(id).subscribe(() => this.loadUsers());
    }
  }
}
