export class CartDTO {
  constructor({ products, totalPrice }) {
    this.products = products;
    this.totalPrice = totalPrice;
  }

  static fromModel(cartModel) {
    return new CartDTO({
      products: cartModel.products,
      totalPrice: cartModel.totalPrice,
    });
  }
}
