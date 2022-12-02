"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ItemsController_1 = require("./controllers/ItemsController");
const allProducts_1 = require("./controllers/allProducts");
const categoryController_1 = require("./controllers/categoryController");
const shoppingCart_1 = require("./controllers/shoppingCart");
const app = (0, express_1.default)();
const itemsController = new ItemsController_1.ItemsController();
const all_products = new allProducts_1.allProducts();
const category = new categoryController_1.categoryController();
const shopping_cart = new shoppingCart_1.shoppingCart();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// NAVIGATION
app.get("/", (req, res) => {
    all_products.index(req, res);
});
app.get("/about-us", (req, res) => {
    res.render('about-us');
});
app.get("/catalog", (req, res) => {
    category.index(req, res);
});
app.get("/auth", (req, res) => {
    res.render('auth');
});
app.get("/shopping_cart", (req, res) => {
    shopping_cart.index(req, res);
});
app.get("/logout", (req, res) => {
    res.render('logout');
});
app.get("/add", (req, res) => {
    res.render('add');
});
