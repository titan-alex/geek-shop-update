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
exports.shoppingCart = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class shoppingCart {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.session.name);
            const shopping_cart = yield prisma.shopping_cart.findMany({
                where: {
                    name: String(req.session.name),
                }
            });
            res.render('shopping_cart', {
                'shopping_cart': shopping_cart,
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
    cart_add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma.shopping_cart.findFirst({
                where: {
                    title: req.body.title
                }
            });
            if (req.session.auth == true && data == null) {
                const { title, description, image, price, category, href, name } = req.body;
                yield prisma.shopping_cart.create({
                    data: {
                        title,
                        description,
                        image,
                        price,
                        category,
                        href,
                        name,
                    }
                });
                res.redirect('/');
            }
            else
                res.render("/", {
                    error: "Auth please",
                });
        });
    }
    cart_del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.shopping_cart.delete({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/shopping_cart');
        });
    }
}
exports.shoppingCart = shoppingCart;
