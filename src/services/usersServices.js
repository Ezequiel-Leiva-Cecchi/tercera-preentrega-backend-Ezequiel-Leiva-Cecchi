// userService.js
import { usersDAO } from '../dao/users/index.js';
import { cartService } from '../services/cartService.js'; // Importa el servicio de carrito

export const register = async (userData) => {
    try {
        // Verificar si el usuario ya existe en la base de datos antes de crear uno nuevo
        const existingUser = await usersDAO.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
       
        if (
            userData.email === 'adminCoder@coder.com' &&
            userData.password === 'adminCod3r123'
        ) {
            userData.isAdmin = true;
        } else {
            userData.isAdmin = false;
        }
        const newUser = await usersDAO.createUser(userData);
        
        // Crear un carrito para el nuevo usuario y asociarlo al usuario
        const newCart = await cartService.createCart(); 
        await usersDAO.updateUserCart(newUser._id, newCart._id); 

        return newUser;
    } catch (error) {
        throw new Error('Failed to register');
    }
};


export const login = async (userData) => {
    try {
        // Buscar el usuario en la base de datos por correo electrónico y contraseña
        const existingUser = await usersDAO.findUserByEmailAndPassword(userData.email, userData.password);
        // Si no se encuentra ningún usuario o las credenciales no coinciden, lanzar un error
        if (!existingUser) {
            throw new Error('Invalid email or password');
        }
        // Devolver los datos del usuario autenticado
        return existingUser;
    } catch (error) {
        throw new Error('Failed to login');
    }
};


export const logout = async (req) => {
    try {
        await req.session.destroy();
    } catch (error) {
        throw new Error('Failed to logout');
    }
};

export const loginWithGithub = async (userData) => {
    return userData;
};
