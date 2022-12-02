import { Request, Response } from 'express';
import { all_products, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class allProducts {

    async index(req: Request, res: Response) {
        const all_products: all_products[] = await prisma.all_products.findMany();//data
        console.log(req.session.auth)

        res.render('home', {
            'all_products': all_products,
            auth: req.session.auth,
            username: req.session.name,
        });
    }
    async about_us(req: Request, res: Response) {
        res.render('about-us', {
            auth: req.session.auth,
            username: req.session.name,
        });
    }
    async register(req: Request, res: Response) {
        res.render('auth', {
            auth: req.session.auth,
            username: req.session.name,
        });
    }

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