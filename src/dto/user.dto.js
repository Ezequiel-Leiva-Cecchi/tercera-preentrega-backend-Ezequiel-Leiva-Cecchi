export class UserDTO {
    constructor({ first_name, last_name, email, cartId, password }) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.cartId = cartId;
      this.password = password;
    }
  
    // Método estático para crear un DTO desde un modelo de usuario de Mongoose
    static fromModel(userModel) {
      const { first_name, last_name, email, cartId, password } = userModel;
      return new UserDTO({ first_name, last_name, email, cartId, password });
    }
  };
  
  
  