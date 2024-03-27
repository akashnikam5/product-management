import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortByPriceDirection: boolean = true;
  sortByNameDirection: boolean = true;
  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProducts();
    this.filteredProducts = this.products;
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.products;
      this.filteredProducts = [...this.products];
    },
      (error) => {
        console.error('Error Occured:', error);
      }
    );
  }

  addProduct(): void {
    this.router.navigate(['/products/add']);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/products/edit', productId]);
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.product_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  toggleSortByPrice(): void {
    if (this.sortByPriceDirection) {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    }
    this.sortByPriceDirection = !this.sortByPriceDirection; // Toggle the sorting direction
  }

  
  sortProductsByName(): void {
    if (this.sortByNameDirection) {
      this.filteredProducts.sort((a, b) => b.product_name.toUpperCase().localeCompare(a.product_name));
    } else {
      this.filteredProducts.sort((a, b) => a.product_name.toUpperCase().localeCompare(b.product_name));
    }
    this.sortByNameDirection = !this.sortByNameDirection; // Toggle the sorting direction
  }
  

  confirmDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.toastr.success('Product deleted Successfully!', 'Success');
          console.log('Product deleted successfully');
        },
        error: (error) => {
          this.toastr.error('Error Occured.', 'Error');
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
