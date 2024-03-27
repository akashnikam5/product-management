import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, Prod, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getProducts(): Observable<ApiResponse> {
    const formData = {
      "list_products": true
    };
    const url = this.apiService.getBaseUrl() + 'product/index.php';
    return this.http.post<ApiResponse>(url, formData);
  }

  getProductById(productId: any): Observable<Prod> {
    const requestBody = {
      "single_product": true,
      "product_id": productId
    };
    const url = this.apiService.getBaseUrl() + 'product/index.php';
    return this.http.post<Prod>(url, requestBody);
  }

  addProduct(productData: any): Observable<any> {
    const url = this.apiService.getBaseUrl() + 'product/index.php';
    return this.http.post<any>(url, productData);
  }


  updateProduct(updatedProductData: any): Observable<Product> {
    const url = this.apiService.getBaseUrl() + 'product/index.php';
    return this.http.put<Product>(url, updatedProductData);
  }

  deleteProduct(productId: number): Observable<any> {
    const b = {
      "delete_product": true,
      "product_id": productId
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true' // Set to true to allow credentials
      }),
      withCredentials: true, // Set to true to include cookies in CORS requests
      body: b // Include the request body
    };

    const url = this.apiService.getBaseUrl() + 'product/index.php';
    return this.http.delete(url, httpOptions);
  }

}
