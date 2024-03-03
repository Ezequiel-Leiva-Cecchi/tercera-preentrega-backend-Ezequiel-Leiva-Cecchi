import { Router } from "express";
import { requireAuth, checkExistingUser } from "../middlewares/authMiddleware.js";
import { register, login, logout, failRegister, loginWithGithub } from "../controllers/users.controller.js";
import passport from "passport";

const sessionRoutes = Router();

sessionRoutes.get('/failregister', failRegister);
sessionRoutes.post('/register', requireAuth, passport.authenticate('register', { failureRedirect: '/failregister' }), register);
sessionRoutes.post('/login', requireAuth, passport.authenticate('login'), login);
sessionRoutes.post('/logout', requireAuth, logout);
sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }));

export default sessionRoutes;
