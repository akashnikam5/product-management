import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ProductListComponent,
    AddEditProductComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent, pathMatch: 'full' },
      { path: 'add', component: AddEditProductComponent },
      { path: 'edit/:id', component: AddEditProductComponent }
    ])

  ]
})
export class ProductsModule { }


