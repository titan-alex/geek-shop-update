import { Request, Response } from 'express';
import { all_products, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class allProducts {

    // async home(req: Request, res: Response) {
    //     const all_products = await prisma.all_products.findUnique({
    //         where: {
    //             id: Number(1)
    //         }
    //     });

        //     res.render('items/show', {
        //         'item': item
        //     });
        // }

        // create(req: Request, res: Response) {
        //     res.render('items/create');
        // }

        // async store(req: Request, res: Response) {
        //     const { title, image } = req.body;

        //     await prisma.items.create({
        //         data: {
        //             title,
        //             image
        //         }
        //     });

        //     res.redirect('/');
        // }
    // }
}