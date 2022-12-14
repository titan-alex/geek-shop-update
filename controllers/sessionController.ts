import { Request, Response } from 'express';
import { users, PrismaClient } from "@prisma/client";
import md5 from "md5";
import { Logger } from "../logger/logger";
import * as ip from 'ip';
import { renderObject } from '../functions';


const prisma: PrismaClient = new PrismaClient();
const logger = new Logger();

export class sessionController {

    async registration(req: Request, res: Response) {
        logger.catcherErr(() => {
            res.render("auth",
                renderObject(req, {
                    'error': ""
                }));
        });
    };

    async login(req: Request, res: Response) {
        logger.catcherErr(async () => {
            const data = await prisma.users.findFirst({
                where: {
                    name: req.body.name
                }
            });
            if (data != null) {
                if (md5(String([req.body.password])) == String(data.password)) {
                    req.session.auth = true;
                    req.session.name = [req.body.name][0];
                    logger.addLog(
                        `${ip.address()} is login on account ${req.session.name}`
                    );
                    res.redirect("/")
                }
                else {
                    logger.addLog(
                        `${ip.address()} is error logining on account ${req.session.name}. error: password is not correct`
                    );
                    res.render("auth",
                        renderObject(req, {
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
    };

    async register(req: Request, res: Response) {
        logger.catcherErr(async () => {
            if (req.body.name == "" || req.body.password == "" || req.body.email == "") {
                logger.addLog(
                    `${ip.address()} is error registering on account ${req.session.name}. error: the field cannot be empty`
                );
                res.render('register',
                    renderObject(req, {
                        'error': "The field cannot be empty"
                    }));
            } else {
                const data = await prisma.users.findFirst({
                    where: {
                        name: req.body.name
                    }
                });
                if (data != null) {
                    logger.addLog(
                        `${ip.address()} is error registering on account ${req.session.name}. error: name already taken`
                    );
                    res.render('auth',
                        renderObject(req, {
                            'error': "Username already taken"
                        }));
                } else {
                    logger.addLog(
                        `${ip.address()} is registering on account ${req.session.name}`
                    );
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
        });
    };

    async logout(req: Request, res: Response) {
        logger.catcherErr(async () => {
            await logger.addLog(
                `${ip.address()} is logout from account ${req.session.name}`
            );
            req.session.auth = false;
            req.session.name = undefined;
            res.redirect("/");
        });
    };
};

