import { Product } from './Product';

export class OrderDetail {
  constructor({ product, quantity, subtotal, tax, total }) {
    this.product = new Product(product);
    this.quantity = quantity;
    this.subtotal = subtotal;
    this.tax = tax;
    this.total = total;
  }
}
