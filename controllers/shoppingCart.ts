import { Request, Response } from 'express';
import { shopping_cart, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class shoppingCart {

    async index(req: Request, res: Response) {
        const shopping_cart: shopping_cart[] = await prisma.shopping_cart.findMany();//data

        res.render('shopping_cart', {
            'shopping_cart': shopping_cart,
        });
    }

}