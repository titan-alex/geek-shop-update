import { Request, Response } from 'express';
import { all_products, PrismaClient } from '@prisma/client';
import { Logger } from "../logger/logger";
import * as ip from 'ip';
import { renderObject } from '../functions';
import { addLog } from '../logger/addLog';

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
        addLog(
            `${req.session.name} added new product: ${req.body.title} 
            category: ${req.body.category}
            ip: ${ip.address()}`
        );

        res.redirect('/add');
    }

    async product_del(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.all_products.delete({
            where: {
                id: Number(id)
            }
        });
        addLog(
            `${req.session.name} deleted product: "${req.body.id}" 
            ip: ${ip.address()}`
        );

        res.redirect('/add');
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