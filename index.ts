import express, { Express, Request, Response } from 'express';
import  session  from 'express-session';
import { Session } from 'inspector';
import path from 'path';
import { ItemsController } from './controllers/ItemsController';
import { allProducts } from './controllers/allProducts';
import { categoryController } from './controllers/categoryController';
import { shoppingCart } from './controllers/shoppingCart';

const app: Express = express();
const itemsController = new ItemsController();
const  all_products = new allProducts();
const  category = new categoryController();
const shopping_cart = new shoppingCart();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// NAVIGATION
app.get("/", (req: Request, res: Response) => {
  all_products.index(req, res);
});
app.get("/about-us", (req: Request, res: Response) => {
  res.render('about-us');
});
app.get("/catalog", (req: Request, res: Response) => {
  category.index(req, res);
});
app.get("/auth", (req: Request, res: Response) => {
  res.render('auth');
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
