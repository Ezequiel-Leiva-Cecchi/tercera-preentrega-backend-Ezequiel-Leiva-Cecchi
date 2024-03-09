export class ProductDTO {
    constructor({ title, description, code, price, status, stock, category }) {
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.status = status;
      this.stock = stock;
      this.category = category;
    }
  
    // Método estático para crear un ProductDTO desde un documento Mongoose
    static fromModel(productModel) {
      return new ProductDTO({
        title: productModel.title,
        description: productModel.description,
        code: productModel.code,
        price: productModel.price,
        status: productModel.status,
        stock: productModel.stock,
        category: productModel.category,
      });
    }
  }
  