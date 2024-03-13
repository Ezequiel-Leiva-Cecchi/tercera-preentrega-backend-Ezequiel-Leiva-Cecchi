import { cartDAO } from '../dao/cart/indexCart.js'; 

export const createCart = async () => {
    try {
        return await cartDAO.createCart();
    } catch (error) {
        throw new Error('Failed to create cart');
    }
};

export const getCartById = async (cartId) => {
    try {
        return await cartDAO.getCartById(cartId);
    } catch (error) {
        throw new Error('Failed to get cart');
    }
};

export const addProductToCart = async (cartId, productId) => {
    try {
        await cartDAO.addProductToCart(cartId, productId);
    } catch (error) {
        throw new Error('Failed to add product to cart');
    }
};

export const updateCart = async (cartId, updateData) => {
    try {
        return await cartDAO.updateCart(cartId, updateData);
    } catch (error) {
        throw new Error('Failed to update cart');
    }
};

export const deleteCart = async (cartId) => {
    try {
        await cartDAO.deleteCart(cartId);
    } catch (error) {
        throw new Error('Failed to delete cart');
    }
};
