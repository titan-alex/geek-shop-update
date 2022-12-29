import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Logger } from "../logger/logger";
import * as ip from 'ip';
import { renderObject } from '../functions';
import { addLog } from '../logger/addLog';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {

    async productAdd(req: Request, res: Response) {
        const { title, image, description, price, category_id } = req.body;
        console.log(req.body.category_id)

        await prisma.items.create({
            data: {
                title: title,
                image: image,
                description: description,
                price: price,
                category_id: Number(category_id),
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
}