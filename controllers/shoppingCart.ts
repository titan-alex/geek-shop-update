import { Request, Response } from 'express';
import { shopping_cart, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class shoppingCart {

    async index(req: Request, res: Response) {
        console.log(req.session.name);
        const shopping_cart: shopping_cart[] = await prisma.shopping_cart.findMany({
            where:{
                name: String(req.session.name),
            }
        });

        res.render('shopping_cart', {
            'shopping_cart': shopping_cart,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async cart_add(req: Request, res: Response){
        const data = await prisma.shopping_cart.findFirst({
            where:{
                title: req.body.title
            }
        });

        if(req.session.auth == true && data == null){
            const{ title, description,image,price,category,href,name} = req.body;
            await prisma.shopping_cart.create({
                data:{
                    title,
                    description,
                    image,
                    price,
                    category,
                    href,
                    name,

                } 
            });
             res.redirect('/');
        } else res.render("/", {
            error: "Auth please",
        });

      
    }
    

}