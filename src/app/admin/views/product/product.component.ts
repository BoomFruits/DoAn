import { Component } from '@angular/core';
import { Product } from '../../../../model/product.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateProduct } from '../../../../model/updateProduct.model';
import { CreateProduct } from '../../../../model/createProduct.model';
import { ProductService } from '../../../services/product.service';
import { FormModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class AdminProductComponent {
  products: Product[] = [];
  categories: { id: number; name: string }[] = [];
  selectedProduct: Product | null = null;
  productForm!: FormGroup;
  keyword: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
    this.loadCategories();
  }

  initForm() {
    this.productForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      unit: [''],
      categoryId: [1, Validators.required],
      createdAt: [''],
      updatedAt: [''],
    });
  }
  loadCategories(){
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res;
    });
  }
  loadProducts() {
    this.productService.getAll().subscribe((res) => (this.products = res));
  }

  edit(p: Product) {
    this.selectedProduct = p;
    this.productForm.patchValue(p);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('vi-VN');
  }

  delete(product: Product) {
    if (confirm(`Delete "${product.title}"?`)) {
      this.productService.delete(product.id).subscribe({
        next: (res) => {
          this.toastr.success("Deleted Product name", product.title);
          this.loadProducts();
        },
        error: (err) => this.toastr.error("Error", err)
      });
    }
  }

  submit() {
    const formValue = this.productForm.value;

      const productPayload: Product = {
      id: formValue.id,
      title: formValue.title,
      description: formValue.description,
      price: formValue.price,
      stockQuantity: formValue.stockQuantity,
      unit: formValue.unit,
      categoryId: formValue.categoryId,
      isAvailable: true,
      categoryName: '', 
      createdAt: formValue.createdAt,
      updatedAt: formValue.updatedAt
    };

    const request$ = this.selectedProduct
      ? this.productService.update(productPayload)
      : this.productService.create(productPayload);

    request$.subscribe({
      next: (res) => {
        this.toastr.success(this.selectedProduct ? "Product updated" : "Product created", res.title);
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => this.toastr.error("Error", err)
    });
  }

  resetForm() {
    this.productForm.reset({ price: 0, stockQuantity: 0, categoryId: 1 });
    this.selectedProduct = null;
  }

  search() {
    const lower = this.keyword.toLowerCase();
    return this.products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.categoryName.toLowerCase().includes(lower)
    );
  }
}
