import { Request, Response } from 'express';
import { category, PrismaClient } from '@prisma/client';
import { Logger } from "../logger/logger";
import * as ip from 'ip';
import { renderObject } from '../functions';
import { addLog } from '../logger/addLog';

const prisma: PrismaClient = new PrismaClient();

export class categoryController {

    async index(req: Request, res: Response) {
        const category: category[] = await prisma.category.findMany({
            where:{
                typ: String('category'), 
            }
        });

        res.render('catalog', {
            'category': category,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async store(req: Request, res: Response) {
        const { title, image, href, typ } = req.body;

        await prisma.category.create({
            data: {
                title,
                image,
                href,
                typ
            }
        });
        addLog(
            `${req.session.name} added new category: "${req.body.title}" 
            type: ${req.body.typ}
            ip: ${ip.address()}`
        );

        res.redirect('/catalog');
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.category.delete({
            where: {
                id: Number(id)
            }
        });
        addLog(
            `${req.session.name} deleted category: "${req.body.id}" 
            ip: ${ip.address()}`
        );

        res.redirect('/catalog');
    }

    async games(req: Request, res: Response) {
        const category: category[] = await prisma.category.findMany({
            where:{
                typ: String('games'), 
            }
        });
        res.render('category/games', {
            'games': category,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

}