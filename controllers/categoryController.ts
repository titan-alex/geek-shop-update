import { Request, Response } from 'express';
import { category, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class categoryController {

    async index(req: Request, res: Response) {
        const category: category[] = await prisma.category.findMany();//data

        res.render('catalog', {
            'category': category,
            auth: req.session.auth,
            username: req.session.name,
        });
    }

}