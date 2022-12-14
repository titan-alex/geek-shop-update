import { Request, Response } from 'express';
import { items, shopping_cart, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ShoppingCartController {

    async index(req: Request, res: Response) {
        console.log(req.session.name);
        const shopping_cart: shopping_cart[] = await prisma.shopping_cart.findMany({
            where: {
                name: String(req.session.name),
            }
        });

        res.render('shopping-cart', {
            'shopping_cart': shopping_cart,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async cartAdd(req: Request, res: Response) {
        const items: items[] = await prisma.items.findMany();

        const data = await prisma.shopping_cart.findFirst({
            where: {
                title: req.body.title
            }
        });
        if (req.session.auth == true && data == null) {
            const { title, description, image, price, category, href, name, article } = req.body;
            await prisma.shopping_cart.create({
                data: {
                    title,
                    description,
                    image,
                    price,
                    category,
                    href,
                    name,
                    article,

                }
            });
            res.redirect('/');
        } else if ( data != null)  {
            res.render("home", {
            error: "Auth pls",
            'items': items,
            auth: req.session.auth,
            name: req.session.name,
        });
    }
    }

    async cartDel(req: Request, res: Response) {
        const { id } = req.body;
        await prisma.shopping_cart.delete({
           where: {
                id: Number(id)
            }
        });
        res.redirect('/shopping-cart');
    }
}