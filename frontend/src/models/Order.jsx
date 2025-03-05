import { OrderDetail } from './OrderDetail';
import { User } from './User';

export class Order {
  constructor({ id, user, address, orderDetails, subTotalCost, totalCost }) {
    this.id = id;
    this.user = new User(user);
    this.address = address;
    // Convertir cada detalle a instancia de OrderDetail
    this.orderDetails = orderDetails.map(detail => new OrderDetail(detail));
    this.subTotalCost = subTotalCost;
    this.totalCost = totalCost;
  }
}
