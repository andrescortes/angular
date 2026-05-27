import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponse } from '../interfaces/product-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _http = inject(HttpClient);

  getProducts(): Observable<IProductResponse> {
    return this._http.get<IProductResponse>('http://localhost:3000/api/products?limit=52');
  }
}
