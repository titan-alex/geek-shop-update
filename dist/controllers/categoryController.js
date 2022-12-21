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
exports.categoryController = void 0;
const client_1 = require("@prisma/client");
const ip = __importStar(require("ip"));
const addLog_1 = require("../logger/addLog");
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
            (0, addLog_1.addLog)(`${req.session.name} added new category: "${req.body.title}" 
            type: ${req.body.typ}
            ip: ${ip.address()}`);
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
            (0, addLog_1.addLog)(`${req.session.name} deleted category: "${req.body.id}" 
            ip: ${ip.address()}`);
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
