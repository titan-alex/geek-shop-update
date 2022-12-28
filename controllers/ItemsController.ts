import { Request, Response } from 'express';
import { items, PrismaClient } from '@prisma/client';
import { Logger } from "../logger/logger";
import * as ip from 'ip';
import { renderObject } from '../functions';
import { addLog } from '../logger/addLog';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {

    async productAdd(req: Request, res: Response) {
        const { title, image, description, price, category_id} = req.body;
        console.log(req.body)

        await prisma.items.create({
            data: {
                title,
                image,
                description,
                price,
                category: {
                    connect: {
                        id: Number(category_id)
                    }
                },
                
            }
        });
        addLog(
            `${req.session.name} added new product: ${req.body.title} 
            category: ${req.body.category}
            ip: ${ip.address()}`
        );

        res.redirect('/add');
    }

    async productDel(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.items.delete({
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
        const items: items[] = await prisma.items.findMany({
            where:{
                type_id: 4, 
            }
        });
        res.render('catalog/games/GenshinImpact', {
            'items': items,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async genshinID(req: Request, res: Response) {
        const items = await prisma.items.findUnique({
            where:{
                id: Number(req.params.id), 
            }
        });
        res.render('item', {
            'items': items,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

}