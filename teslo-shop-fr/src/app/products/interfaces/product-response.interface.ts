import { User } from "@/app/auth/interfaces/user.interface";

export interface IProductResponse {
  count:    number;
  pages:    number;
  products: IProduct[];
}

export interface IProduct {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  sizes:       ISize[];
  gender:      IGender;
  tags:        string[];
  images:      string[];
  user:        User;
}

export enum IGender {
  Kid = "kid",
  Men = "men",
  Unisex = "unisex",
  Women = "women",
}

export enum ISize {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
}


