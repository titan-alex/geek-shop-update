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
const allProducts_1 = require("./controllers/allProducts");
const categoryController_1 = require("./controllers/categoryController");
const shoppingCart_1 = require("./controllers/shoppingCart");
const sessionController_1 = require("./controllers/sessionController");
const pageController_1 = require("./controllers/pageController");
const app = (0, express_1.default)();
const all_products = new allProducts_1.allProducts();
const category = new categoryController_1.categoryController();
const shopping_cart = new shoppingCart_1.shoppingCart();
const pagesController = new pageController_1.pageController();
const authenticationController = new sessionController_1.sessionController();
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
app.get("/shopping_cart", (req, res) => {
    shopping_cart.index(req, res);
});
app.get("/add", (req, res) => {
    pagesController.add(req, res);
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
// STORE
app.post("/product_add", (req, res) => {
    all_products.product_add(req, res);
});
app.post("/product_del", (req, res) => {
    all_products.product_del(req, res);
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
