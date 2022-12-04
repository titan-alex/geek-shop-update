import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import { allProducts } from './controllers/allProducts';
import { categoryController } from './controllers/categoryController';
import { shoppingCart } from './controllers/shoppingCart';
import { sessionController } from './controllers/sessionController';

const app: Express = express();
const all_products = new allProducts();
const category = new categoryController();
const shopping_cart = new shoppingCart();
const authenticationController = new sessionController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Инициализация сессии
declare module "express-session" {
  interface SessionData {
    auth: boolean,
    name: string,
    email: string,
  }
};
app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));
// NAVIGATION
app.get("/", (req: Request, res: Response) => {
  all_products.index(req, res);
});
app.get("/about-us", (req: Request, res: Response) => {
  all_products.about_us(req, res);
});
app.get("/catalog", (req: Request, res: Response) => {
  category.index(req, res);
});
app.get("/auth", (req: Request, res: Response) => {
  all_products.register(req, res);
});
app.get("/shopping_cart", (req: Request, res: Response) => {
  shopping_cart.index(req, res);
});
app.get("/logout", (req: Request, res: Response) => {
  res.render('logout');
});
app.get("/add", (req: Request, res: Response) => {
  res.render('add');
});

// SESSION
app.get("/auth", async (req: Request, res: Response) => {
  console.log(req.session.auth)
  authenticationController.registration(req, res);
});

app.post("/login", async (req: Request, res: Response) => {
  authenticationController.login(req, res);
});

app.post("/register", async (req: Request, res: Response) => {
  authenticationController.register(req, res);
});

app.post("/logout", async (req: Request, res: Response) => {
  authenticationController.logout(req, res);
});
