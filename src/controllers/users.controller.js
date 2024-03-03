import * as usersServices from '../services/usersServices.js';

export const register = async (req, res, next) => {
    try {
        console.log("Datos del usuario recibidos para registro:", req.user);
        const newUser = await usersServices.register(req.user);
        req.session.user = newUser;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res, next) => {
    try {
        const authenticatedUser = await usersServices.login(req.user);
        req.session.user = authenticatedUser;
        res.redirect('/welcome');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req, res, next) => {
    try {
        await usersServices.logout(req);
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const failRegister = async (req, res, next) => {
    res.status(400).send({ error: 'Failed to register' });
};

export const loginWithGithub = async (req, res, next) => {
    try {
        req.session.user = await usersServices.loginWithGithub(req.user);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};
