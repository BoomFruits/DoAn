import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category, CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './category-admin.component.html',
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[] = [];
  form!: FormGroup;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
  }

  submit() {
    const name = this.form.value.name;
    const category: Category = {
      name: name,
      id: this.editingId != null ? this.editingId : 0
    };
    if (this.editingId) {
      this.categoryService.update(this.editingId, category).subscribe(() => {
        this.load();
        this.toastr.success(
          'Cập nhập danh mục id = ' + this.editingId + ' thành công'
        );
        this.reset();
      });
    } else {
      this.categoryService.create(category).subscribe(() => {
        this.load();
        this.toastr.success('Không tìm thấy danh mục id = ' + this.editingId);
        this.reset();
      });
    }
  }

  edit(c: Category) {
    this.editingId = c.id;
    this.form.patchValue({ name: c.name });
  }

  delete(id: number) {
    if (confirm('Xác nhận xoá danh mục?')) {
      this.categoryService.delete(id).subscribe(() => this.load());
    }
  }

  reset() {
    this.editingId = null;
    this.form.reset();
  }
}
