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
exports.allProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class allProducts {
    product_add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, description, price, category, href } = req.body;
            yield prisma.all_products.create({
                data: {
                    title,
                    image,
                    description,
                    price,
                    category,
                    href,
                }
            });
            res.redirect('/');
        });
    }
    product_del(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.all_products.delete({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/');
        });
    }
    genshin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const all_products = yield prisma.all_products.findMany({
                where: {
                    category: String('genshinimpact'),
                }
            });
            res.render('catalog/games/GenshinImpact', {
                'all_products': all_products,
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
    genshinID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const all_products = yield prisma.all_products.findUnique({
                where: {
                    id: Number(req.params.id),
                }
            });
            res.render('item', {
                'all_products': all_products,
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
}
exports.allProducts = allProducts;
