import * as cartService from '../services/cartService.js';

export const getCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getCartById(cid);
        res.json({ cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCartProducts = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getCartById(cid);
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
        const { productId, cid } = req.params;
        await cartService.addProductToCart(cid, productId);
        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Resto de los controladores mantienen su estructura similar


export const deleteCart = async (req, res, next) => {
    try {
        const { cId } = req.params;
        await cartService.deleteCart(cId);
        res.json({ message: 'Successfully deleted cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { productId, cId } = req.params;
        const cart = await cartService.getCartById(cId);
        const productIndex = cart.products.findIndex(product => product.product.toString() === productId);

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cartService.updateCart(cId, { products: cart.products });

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
        const { cId } = req.params;
        const updateData = req.body;
        const updatedCart = await cartService.updateCart(cId, updateData);
        res.json({ message: 'Successfully updated cart', updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
