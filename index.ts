import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import { ItemsController } from './controllers/ItemsController';
import { CategoriesController } from './controllers/CategoriesController';
import { ShoppingCartController } from './controllers/ShoppingCartController';
import { SessionController } from './controllers/SessionController';
import { PagesController } from './controllers/PagesController';

const app: Express = express();
const all_products = new ItemsController();
const category = new  CategoriesController();
const shopping_cart = new ShoppingCartController();
const authenticationController = new SessionController();
const pagesController = new PagesController();

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
  pagesController.index(req, res);
});
app.get("/about-us", (req: Request, res: Response) => {
  pagesController.about_us(req, res);
});
app.get("/catalog", (req: Request, res: Response) => {
  category.index(req, res);
});
app.get("/auth", (req: Request, res: Response) => {
  pagesController.register(req, res);
});
app.get("/shopping-cart", (req: Request, res: Response) => {
  shopping_cart.index(req, res);
});
app.get("/add", (req: Request, res: Response) => {
  pagesController.add(req, res);
});

// CART

app.post("/cart-add", (req: Request, res: Response) => {
  shopping_cart.cartAdd(req, res);
});
app.post("/cart-del", (req: Request, res: Response) => {
  shopping_cart.cartDel(req, res);
});

// CATALOG

app.get("/1", (req: Request, res: Response) => {
  category.games(req, res);
});
app.get("/GenshinImpact", (req: Request, res: Response) => {
  all_products.genshin(req, res);
});
app.get("/GenshinImpact/:id", (req: Request, res: Response) => {
  all_products.genshinID(req, res);
});

// app.get("/categories/:id");

// // category
// // games - 1
// // movies - 2
// app.get("/category/:id");

// // items
// app.get("/items/:id");


// STORE
app.post("/product-add", (req: Request, res: Response) => {
  all_products.productAdd(req, res);
});
app.post("/product-del", (req: Request, res: Response) => {
  all_products.productDel(req, res);
});
app.post("/store", (req: Request, res: Response) => {
  category.store(req, res);
});
app.post("/delete", (req: Request, res: Response) => {
  category.delete(req, res);
});

// SESSION
app.get("/auth", async (req: Request, res: Response) => {
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
