import { Request, Response } from 'express';
import { all_products, category, shopping_cart, PrismaClient } from '@prisma/client';


const prisma: PrismaClient = new PrismaClient();

export class pageController {

async index(req: Request, res: Response) {
        const all_products: all_products[] = await prisma.all_products.findMany();

        res.render('home', {
            'all_products': all_products,
            auth: req.session.auth,
            name: req.session.name,
        });
    }
    async about_us(req: Request, res: Response) {
        res.render('about-us', {
            auth: req.session.auth,
            name: req.session.name,
        });
    } 
    async register(req: Request, res: Response) {
        res.render('auth', {
            auth: req.session.auth,
            name: req.session.name,
        });
    }
    async add(req: Request, res: Response) {
        res.render('add', {
            auth: req.session.auth,
            name: req.session.name,
        });
    }
}
