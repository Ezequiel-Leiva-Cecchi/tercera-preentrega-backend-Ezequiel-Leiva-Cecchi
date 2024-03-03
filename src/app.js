import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import sessionRoutes from './routes/session.routes.js';
import viewsRoutes from './routes/views.routes.js';
import { requireAuth, checkExistingUser } from './middlewares/authMiddleware.js';
import passport from 'passport';
import initialzePassport from './config/passport.config.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

// Configuración de la sesión y conexión a MongoDB
app.use(session({
    secret: SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: MONGODB_URL,
    })
}));

initialzePassport();
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGODB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Configuración de Handlebars
const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});
app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

// Rutas de sesión
app.use('/api/session', sessionRoutes);
// Rutas de vistas
app.use('/', viewsRoutes);
// Rutas de productos
app.use('/api/products', productRouter);
// Rutas de carrito
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});