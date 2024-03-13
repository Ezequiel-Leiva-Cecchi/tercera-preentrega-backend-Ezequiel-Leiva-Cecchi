import cartModel from "../models/carts.model.js";

export const createCart = async () => {
    try {
        const newCart = await cartModel.create({});
        return newCart;
    } catch (error) {
        throw new Error('Failed to create cart');
    }
};

export const getCartById = async (cartId) => {
    try {
        const cart = await cartModel.findById(cartId).populate('products.product');
        return cart;
    } catch (error) {
        throw new Error('Failed to get cart');
    }
};

export const updateCart = async (cartId, updateData) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(cartId, updateData, { new: true });
        return updatedCart;
    } catch (error) {
        throw new Error('Failed to update cart');
    }
};

export const deleteCart = async (cartId) => {
    try {
        await cartModel.findByIdAndDelete(cartId);
    } catch (error) {
        throw new Error('Failed to delete cart');
    }
};
