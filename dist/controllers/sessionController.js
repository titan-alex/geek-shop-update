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
exports.sessionController = void 0;
const client_1 = require("@prisma/client");
const md5_1 = __importDefault(require("md5"));
const prisma = new client_1.PrismaClient();
class sessionController {
    constructor() {
        this.result = this.makeString();
    }
    makeString() {
        let outString = '';
        let inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
        }
        return outString;
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("auth", {
                error: "",
                auth: req.session.auth,
                name: req.session.name,
                email: req.session.email,
            });
        });
    }
    ;
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma.users.findFirst({
                where: {
                    name: req.body.name
                }
            });
            if (data != null) {
                if ((0, md5_1.default)(String([req.body.password])) == String(data.password)) {
                    req.session.auth = true;
                    req.session.name = [req.body.name][0];
                    res.redirect('/');
                }
                else {
                    req.session.auth = false;
                    res.redirect('/auth');
                }
            }
            else
                res.render("login", {
                    error: "The user does not exist",
                    auth: req.session.auth,
                    name: req.session.name,
                });
        });
    }
    ;
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.name == "" || req.body.password == "" || req.body.email == "") {
                res.render('register', {
                    error: "The field cannot be empty",
                    auth: req.session.auth,
                    name: req.session.name,
                    email: req.body.email
                });
                console.log(req.body);
            }
            else {
                const data = yield prisma.users.findFirst({
                    where: {
                        name: req.body.name
                    }
                });
                if (data != null) {
                    res.render('register', {
                        error: "name already taken",
                        auth: req.session.auth,
                        name: req.session.name,
                        email: req.body.email
                    });
                }
                else {
                    yield prisma.users.create({
                        data: {
                            name: req.body.name,
                            password: (0, md5_1.default)(String(req.body.password)),
                            email: req.body.email
                        }
                    });
                    req.session.auth = true;
                    req.session.name = [req.body.name][0];
                    res.redirect('/');
                }
            }
        });
    }
    ;
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.auth = false;
            req.session.name = undefined;
            res.redirect("/");
        });
    }
    ;
}
exports.sessionController = sessionController;
