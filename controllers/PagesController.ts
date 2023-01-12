import { Request, Response } from 'express';
import { items, categories, shopping_cart, PrismaClient } from '@prisma/client';


const prisma: PrismaClient = new PrismaClient();

export class PagesController {

async index(req: Request, res: Response) {
        const items: items[] = await prisma.items.findMany();
        const categories: categories[] = await prisma.categories.findMany({
            where:{
                parent_id: Number(0),
            }
        });
        const cinema: categories[] = await prisma.categories.findMany({
            where:{
                id: { in: [1, 3, 6] },
            }    
        });
        const games: categories[] = await prisma.categories.findMany({
            where:{
                parent_id: Number(2),
            }
        });
        const clothes: categories[] = await prisma.categories.findMany({
            where:{
                parent_id: Number(7),
            }
        });
        const other: categories[] = await prisma.categories.findMany({
            where:{
                id: { in: [4, 5] },
            }    
        });

        res.render('home', {
            'items': items,
            'categories': categories,
            'cinema': cinema,
            'games': games,
            'other': other,
            'clothes': clothes,
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
