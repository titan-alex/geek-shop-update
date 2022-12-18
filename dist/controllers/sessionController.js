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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionController = void 0;
const client_1 = require("@prisma/client");
const md5_1 = __importDefault(require("md5"));
const ip = __importStar(require("ip"));
const functions_1 = require("../functions");
const addLog_1 = require("../logger/addLog");
const prisma = new client_1.PrismaClient();
class sessionController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("auth", (0, functions_1.renderObject)(req, {
                'error': ""
            }));
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
                    (0, addLog_1.addLog)((`${ip.address()} is login on account ${req.session.name}`));
                    res.redirect("/");
                }
                else {
                    (0, addLog_1.addLog)(`${ip.address()} is error logining on account ${req.session.name}. error: password is not correct`);
                    res.render("auth", (0, functions_1.renderObject)(req, {
                        'error': "Password is not correct"
                    }));
                }
            }
            else {
                res.render("auth", {
                    error: "The user does not exist",
                    auth: req.session.auth,
                    name: req.session.name,
                });
            }
        });
    }
    ;
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.name == "" || req.body.password == "" || req.body.email == "") {
                (0, addLog_1.addLog)(`${ip.address()} is error registering on account ${req.session.name}. error: the field cannot be empty`);
                res.render('register', (0, functions_1.renderObject)(req, {
                    'error': "The field cannot be empty"
                }));
            }
            else {
                const data = yield prisma.users.findFirst({
                    where: {
                        name: req.body.name
                    }
                });
                if (data != null) {
                    (0, addLog_1.addLog)(`${ip.address()} is error registering on account ${req.session.name}. error: name already taken`);
                    res.render('auth', (0, functions_1.renderObject)(req, {
                        'error': "Username already taken"
                    }));
                }
                else {
                    (0, addLog_1.addLog)(`${ip.address()} is registering on account ${req.session.name}`);
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
            yield (0, addLog_1.addLog)(`${ip.address()} is logout from account ${req.session.name}`);
            req.session.auth = false;
            req.session.name = undefined;
            res.redirect("/");
        });
    }
    ;
}
exports.sessionController = sessionController;
;
