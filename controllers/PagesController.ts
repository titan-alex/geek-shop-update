import { Request, Response } from 'express';
import { items, categories, shopping_cart, PrismaClient } from '@prisma/client';


const prisma: PrismaClient = new PrismaClient();

export class PagesController {

async index(req: Request, res: Response) {
        const items: items[] = await prisma.items.findMany();

        res.render('home', {
            'items': items,
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
