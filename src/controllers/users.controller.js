import passport from "passport";

export const register = async (req, res, next) => {

    try {
        // console.log(‘Datos del usuario recibidos para registro:’, req.user);
        // const newUser = await usersServices.register(req.user);
        req.session.user = req.user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }

};

export const login = async (req, res, next) => {
    try {
        // const authenticatedUser = await usersServices.login(req.user);
        req.session.user = req.user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};
export const failRegister = async (req, res, next) => {
    res.status(400).send({ error: 'Failed to register' });
};

export const logout = async (req, res, next) => {
    try {
        req.logout(); // Usando el método de Passport para cerrar la sesión
        req.session.destroy(); // Destruye la sesión
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const loginWithGithub = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
            return;
        }
        if (!user) {
            res.status(400).send({ error: 'Failed to login with Github' });
            return;
        }
        req.session.user = user;
        res.redirect('/');
    })(req, res, next);
};
