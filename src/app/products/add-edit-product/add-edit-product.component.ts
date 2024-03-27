import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Prod, Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode: boolean = false;
  productId!: number;
  product!: Product;

  selectedImage: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.isEditMode = true;
        this.productId = id;
        this.loadProduct(id);
      }
    });
  }

  initializeForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: [0, Validators.required],
      price: [0, Validators.required], 
      description: ['', Validators.required],
      image: ['']
    });
  }




  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        if (response && response.status === "success" && response.products) {
          const product = response.products;
          this.productForm.patchValue({
            name: product.product_name,
            id: product.product_id,
            price: product.price,
            description: product.description,
            image: product.image
          });
        } else {
        }
      },
      error: (error) => {
      }
    });
  }


  onSubmit(): void {
    console.log("submit called")
    if (this.productForm && this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditMode) {
        this.updateProduct(productData);
      } else {
        this.addProduct(productData);
      }
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }


  addProduct(productData: Product): void {
    const formData = {
      "add_product": true,
      "product_name": this.productForm.value.name,
      "image": this.productForm.value.image,
      "description": this.productForm.value.description,
      "price": this.productForm.value.price
    }

    this.productService.addProduct(formData).subscribe(
      (response) => {
        this.toastr.success('Product Added Successfully!', 'Success');
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error Occured.', 'Error');
      }
    );
  }

  updateProduct(productData: Product): void {
    const formData = {
      "update_product":true,
      "product_id": this.productForm.value.id,
      "product_name": this.productForm.value.name,
      "image": this.productForm.value.image,
      "description": this.productForm.value.description,
      "price": this.productForm.value.price
    }
    this.productService.updateProduct(formData).subscribe({
      next: (response) => {
        this.toastr.success('Product updated successfully!', 'Success');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.toastr.error('Error Occured.', 'Error');
      }
    });
  }

  resetForm() {
    this.productForm.reset();
  }

  onFileSelected(event: any): void {
    console.log("file selectd")
    const file: File = event.target.files[0];
    console.log(file)
    if (!file) return;
    this.imageUploadService.uploadImage(file)
      .subscribe(response => {
        if (response && response.status === 'success') {
          console.log("success hoil")
          this.productForm.get('image')?.setValue(response.url as string);
          console.log('Image URL:', response.url);
        }
      });
  }

 

}



