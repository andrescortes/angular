import { Component, inject, OnInit, resource } from '@angular/core';
import { ProductCard } from '@/app/store-front/components/product-card/product-card';
import { ProductService } from '@/app/products/services/Product.service';
import { IProduct, IProductResponse } from '@/app/products/interfaces/product-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private readonly _productService = inject(ProductService);
  products: IProduct[] = [];
  productsResource = rxResource({
    params: () => ({}),
    stream: () => this._productService.getProducts(),
  });
  ngOnInit(): void {
    console.log({'value': this.productsResource.value() });

  }
}
