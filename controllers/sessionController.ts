import { Request, Response } from 'express';
import { users, PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

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
        })
        let password = req.body.password;
        let hash = data?.password;
        if (data != null) {
            bcrypt.compare(password, String(hash), (err, result) => {
                if (result == true) {
                    req.session.auth = true;
                    res.redirect('/');
                }
                else {

                    req.session.auth = false;
                    res.redirect('/auth');
                }
            });
            req.session.name = [req.body.name][0];
        }
        else res.render("login", {
            error: "The user does not exist",
            auth: req.session.auth,
            name: req.session.name,
        });
    };

    async register(req: Request, res: Response) {
        if (req.body.name == "" || req.body.password == "") {
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
            let salt = 10;
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
                        password: String(
                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(req.body.password, salt, function (err, hash) {
                                    console.log(req.body.password);
                                    console.log(hash);
                                    console.log(bcrypt.compareSync(req.body.password, hash));
                                });
                            })),
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

