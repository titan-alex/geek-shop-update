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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class pageController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const all_products = yield prisma.all_products.findMany(); //data
            console.log(req.session.auth);
            res.render('home', {
                'all_products': all_products,
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
    about_us(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('about-us', {
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('auth', {
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('add', {
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
}
exports.pageController = pageController;
