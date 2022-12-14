"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ip = __importStar(require("ip"));
const addLog_1 = require("../logger/addLog");
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
            (0, addLog_1.addLog)(`${req.session.name} added new product: ${req.body.title} 
            category: ${req.body.category}
            ip: ${ip.address()}`);
            res.redirect('/add');
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
            (0, addLog_1.addLog)(`${req.session.name} deleted product: "${req.body.id}" 
            ip: ${ip.address()}`);
            res.redirect('/add');
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
