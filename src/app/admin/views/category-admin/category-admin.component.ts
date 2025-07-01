import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-admin',
  standalone:true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './category-admin.component.html'
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[] = [];
  form!: FormGroup;
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe(res => this.categories = res);
  }

  submit() {
    const name = this.form.value.name;

    if (this.editingId) {
      this.categoryService.update(this.editingId, name).subscribe(() => {
        this.reset();
        this.load();
      });
    } else {
      this.categoryService.create(name).subscribe(() => {
        this.reset();
        this.load();
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
