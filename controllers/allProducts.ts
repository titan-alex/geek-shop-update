import { Request, Response } from 'express';
import { all_products, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class allProducts {

    async product_add(req: Request, res: Response) {
        const { title, image, description, price, category, href} = req.body;

        await prisma.all_products.create({
            data: {
                title,
                image,
                description,
                price,
                category,
                href,
                
            }
        });

        res.redirect('/');
    }

    async product_del(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.all_products.delete({
            where: {
                id: Number(id)
            }
        });

        res.redirect('/');
    }



    async genshin(req: Request, res: Response) {
        const all_products: all_products[] = await prisma.all_products.findMany({
            where:{
                category: String('genshinimpact'), 
            }
        });
        res.render('catalog/games/GenshinImpact', {
            'all_products': all_products,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async genshinID(req: Request, res: Response) {
        const all_products = await prisma.all_products.findUnique({
            where:{
                id: Number(req.params.id), 
            }
        });
        res.render('item', {
            'all_products': all_products,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

}