import { Request, Response } from 'express';
import { all_products, shopping_cart, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class shoppingCart {

    async index(req: Request, res: Response) {
        console.log(req.session.name);
        const shopping_cart: shopping_cart[] = await prisma.shopping_cart.findMany({
            where: {
                name: String(req.session.name),
            }
        });

        res.render('shopping_cart', {
            'shopping_cart': shopping_cart,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async cart_add(req: Request, res: Response) {
        const all_products: all_products[] = await prisma.all_products.findMany();

        const data = await prisma.shopping_cart.findFirst({
            where: {
                title: req.body.title
            }
        });
        console.log(data);
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
            'all_products': all_products,
            auth: req.session.auth,
            name: req.session.name,
        });
    }
    }

    async cart_del(req: Request, res: Response) {
        const { id } = req.body;
        await prisma.shopping_cart.delete({
           where: {
                id: Number(id)
            }
        });
        res.redirect('/shopping_cart');
    }
}