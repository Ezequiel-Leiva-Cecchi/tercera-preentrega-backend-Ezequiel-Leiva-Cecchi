import * as cartService from '../services/cartService.js';

export const getCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await cartService.getCartById(cartId);
        res.json({ cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCartProducts = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await cartService.getCartById(cartId);
        res.json({ cartProducts: cart.products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addCart = async (req, res, next) => {
    try {
        const newCart = await cartService.createCart();
        res.json({ message: 'Successfully added cart', cartId: newCart._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProductInCart = async (req, res, next) => {
    try {
        const { productId, cartId } = req.params;
        const cart = await cartService.getCartById(cartId);
        const existingProductIndex = cart.products.findIndex(product => product.product.toString() === productId);

        if (existingProductIndex !== -1) {
         
            cart.products[existingProductIndex].quantity++;
        } else {
           
            cart.products.push({ product: productId, quantity: 1 });
        }
    
        await cartService.updateCart(cartId, { products: cart.products });

        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        await cartService.deleteCart(cartId);
        res.json({ message: 'Successfully deleted cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { productId, cartId } = req.params;
        const cart = await cartService.getCartById(cartId);
        const productIndex = cart.products.findIndex(product => product.product.toString() === productId);

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cartService.updateCart(cartId, { products: cart.products });

            res.json({ message: 'Product deleted from cart successfully' });
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const updateData = req.body;
        const updatedCart = await cartService.updateCart(cartId, updateData);
        res.json({ message: 'Successfully updated cart', updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
