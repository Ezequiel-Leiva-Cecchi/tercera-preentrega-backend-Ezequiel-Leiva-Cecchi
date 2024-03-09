export class CartDTO {
    constructor({ products, totalPrice }) {
      this.products = products;
      this.totalPrice = totalPrice;
    }
  
    // Método estático para crear un CartDTO desde un documento Mongoose
    static fromModel(cartModel) {
      return new CartDTO({
        products: cartModel.products,
        totalPrice: cartModel.totalPrice,
      });
    }
  }
  