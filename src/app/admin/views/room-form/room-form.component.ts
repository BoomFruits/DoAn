import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FormModule } from '@coreui/angular';
import { RoomImage } from '../../../../model/RoomImage.model';
import { AdminRoomService } from '../../../services/adminroom.service';



@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormModule]
})
export class RoomFormComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean = false;
  @Input() roomData: any;
  @Output() formSaved = new EventEmitter<void>();

  form!: FormGroup;
  selectedFiles: File[] = [];
  selectedImages: RoomImage[] = [];

  constructor(private fb: FormBuilder, private roomService: AdminRoomService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      room_No: [''],
      room_Name: [''],
      capacity: [1],
      type: ['Single'],
      price: [0],
      isAvailable: [true],
      bed: [1],
      bath: [1],
      area: [20],
      description: ['']
    });
    
    if (this.isEdit && this.roomData) {
      this.form?.patchValue(this.roomData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  if (changes['roomData'] && this.roomData) {
    this.form?.patchValue(this.roomData);
    this.selectedImages = [];
    this.selectedFiles = [];

    if (this.roomData.images && this.roomData.images.length > 0) {
      this.selectedImages = this.roomData.images.map((imgPath: string, index: number) => ({
        url: `${this.roomService.getImageBaseUrl()}${imgPath}`,
        isServerImage: true,
        id: index 
      }));
    }
    console.log('Selected images:', this.selectedImages);
  }
}


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach(file => {
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push({ url: e.target.result, isServerImage: false });
      };
      reader.readAsDataURL(file);
    });

    this.updateFormImages();
  }

  private updateFormImages(): void {
    const dataTransfer = new DataTransfer();
    this.selectedFiles.forEach(file => dataTransfer.items.add(file));
    this.form.patchValue({ images: dataTransfer.files });
    this.form.get('Images')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    if (this.isEdit && this.roomData) {
        const keptImageUrls = this.selectedImages
          .filter(si => si.isServerImage && si.url)
          .map(si => si.url.replace(this.roomService.getImageBaseUrl(), '')); 
        if (keptImageUrls.length > 0) {
          formData.append('KeptImageUrls', JSON.stringify(keptImageUrls));
        }
}

    // Append new files
    this.selectedFiles.forEach(file => {
      formData.append('NewImages', file);
    });

    const request$ = this.isEdit && this.roomData
      ? this.roomService.updateRoom(this.roomData.id, formData)
      : this.roomService.createRoom(formData);

    request$.subscribe({
      next: () => {
        alert(this.isEdit ? 'Room updated!' : 'Room created!');
        this.resetForm();
        this.formSaved.emit();
      },
      error: err => console.error('Error:', err)
    });
  }

  removeImage(index: number): void {
    const image = this.selectedImages[index];
    this.selectedImages.splice(index, 1);
    if (!image.isServerImage) {
      this.selectedFiles.splice(index, 1);
  }
  }

  resetForm(): void {
    this.form.reset();
    this.selectedFiles = [];
    this.selectedImages = [];
  }
}

