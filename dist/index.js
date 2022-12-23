"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const ItemsController_1 = require("./controllers/ItemsController");
const CategoriesController_1 = require("./controllers/CategoriesController");
const ShoppingCartController_1 = require("./controllers/ShoppingCartController");
const SessionController_1 = require("./controllers/SessionController");
const PagesController_1 = require("./controllers/PagesController");
const app = (0, express_1.default)();
const all_products = new ItemsController_1.ItemsController();
const category = new CategoriesController_1.CategoriesController();
const shopping_cart = new ShoppingCartController_1.ShoppingCartController();
const authenticationController = new SessionController_1.SessionController();
const pagesController = new PagesController_1.PagesController();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
;
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
// NAVIGATION
app.get("/", (req, res) => {
    pagesController.index(req, res);
});
app.get("/about-us", (req, res) => {
    pagesController.about_us(req, res);
});
app.get("/catalog", (req, res) => {
    category.index(req, res);
});
app.get("/auth", (req, res) => {
    pagesController.register(req, res);
});
app.get("/shopping-cart", (req, res) => {
    shopping_cart.index(req, res);
});
app.get("/add", (req, res) => {
    pagesController.add(req, res);
});
// CART
app.post("/cart-add", (req, res) => {
    shopping_cart.cartAdd(req, res);
});
app.post("/cart-del", (req, res) => {
    shopping_cart.cartDel(req, res);
});
// CATALOG
app.get("/games", (req, res) => {
    category.games(req, res);
});
app.get("/GenshinImpact", (req, res) => {
    all_products.genshin(req, res);
});
app.get("/GenshinImpact/:id", (req, res) => {
    all_products.genshinID(req, res);
});
// // category
// // games - 1
// // movies - 2
// app.get("/category/:id");
// // items
// app.get("/items/:id");
// STORE
app.post("/product-add", (req, res) => {
    all_products.productAdd(req, res);
});
app.post("/product-del", (req, res) => {
    all_products.productDel(req, res);
});
app.post("/store", (req, res) => {
    category.store(req, res);
});
app.post("/delete", (req, res) => {
    category.delete(req, res);
});
// SESSION
app.get("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    authenticationController.registration(req, res);
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    authenticationController.login(req, res);
}));
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    authenticationController.register(req, res);
}));
app.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    authenticationController.logout(req, res);
}));
