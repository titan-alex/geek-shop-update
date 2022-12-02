"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
index.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));
function isAuth(req, res, next) {
    if (req.session.auth) {
        next();
    }
    else {
        res.redirect('');
    }
}
