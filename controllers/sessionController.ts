import { Request, Response } from 'express';
import { users, PrismaClient } from "@prisma/client";
import md5 from "md5";


const prisma: PrismaClient = new PrismaClient();

export class sessionController {
    
    async registration(req: Request, res: Response) {
        res.render("auth",
            {
                error: "",
                auth: req.session.auth,
                name: req.session.name,
                email: req.session.email,
            });
    };

    async login(req: Request, res: Response) {
        const data = await prisma.users.findFirst({
            where: {
                name: req.body.name
            }
        });
        if (data != null) {
            if (md5(String([req.body.password])) == String(data.password)) {
                req.session.auth = true;
                req.session.name = [req.body.name][0];
                res.redirect("/")
            }
        }
        else res.render("auth", {
            error: "The user does not exist",
            auth: req.session.auth,
            name: req.session.name,
        });
    };

    async register(req: Request, res: Response) {
        if (req.body.name == "" || req.body.password == "" || req.body.email == "") {
            res.render('register', {
                error: "The field cannot be empty",
                auth: req.session.auth,
                name: req.session.name,
                email: req.body.email
            });
        } else {
            const data = await prisma.users.findFirst({
                where: {
                    name: req.body.name
                }
            })
            if (data != null) {
                res.render('register', {
                    error: "name already taken",
                    auth: req.session.auth,
                    name: req.session.name,
                    email: req.body.email
                });
            } else {
                await prisma.users.create({
                    data: {
                        name: req.body.name,
                        password: md5(String(req.body.password)),
                        email: req.body.email
                    }
                });
                req.session.auth = true;
                req.session.name = [req.body.name][0];
                res.redirect('/');
            }
        }
    };
    
    async logout (req: Request, res: Response) {
        req.session.auth = false;
        req.session.name = undefined;
        res.redirect("/");
    };
}

