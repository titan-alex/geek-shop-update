import { Request, Response } from 'express';
import { category, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class categoryController {

    async index(req: Request, res: Response) {
        const category: category[] = await prisma.category.findMany();//data

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

        res.redirect('/catalog');
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.category.delete({
            where: {
                id: Number(id)
            }
        });

        res.redirect('/catalog');
    }

}