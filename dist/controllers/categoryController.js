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
exports.categoryController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class categoryController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma.category.findMany({
                where: {
                    typ: String('category'),
                }
            });
            res.render('catalog', {
                'category': category,
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, href, typ } = req.body;
            yield prisma.category.create({
                data: {
                    title,
                    image,
                    href,
                    typ
                }
            });
            res.redirect('/catalog');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.category.delete({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/catalog');
        });
    }
    games(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma.category.findMany({
                where: {
                    typ: String('games'),
                }
            });
            res.render('category/games', {
                'games': category,
                auth: req.session.auth,
                name: req.session.name,
            });
        });
    }
}
exports.categoryController = categoryController;
