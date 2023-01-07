import { Request, Response } from 'express';
import { categories, items,  PrismaClient } from '@prisma/client';
import { Logger } from "../logger/logger";
import * as ip from 'ip';
import { renderObject } from '../functions';
import { addLog } from '../logger/addLog';

const prisma: PrismaClient = new PrismaClient();

export class CategoriesController {

    async show(req: Request, res: Response) {
        const categories: categories[] = await prisma.categories.findMany({
            where: {
                parent_id: 0
            }
        });
        res.render('category/show', {
            'categories': categories,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async store(req: Request, res: Response) {
        const { title, image, parent_id } = req.body;

        await prisma.categories.create({
            data: {
                title,
                image,
                parent_id: Number(parent_id)
            }
        });
        addLog(
            `${req.session.name} added new category: "${req.body.title}" 
            parent: ${req.body.parent_id}
            ip: ${ip.address()}`
        );

        res.redirect('category/show');
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;
        await prisma.categories.delete({
            where: {
                id: Number(id)
            }
        });
        addLog(
            `${req.session.name} deleted category: "${req.body.id}" 
            ip: ${ip.address()}`
        );

        res.redirect('category/show');
    }

    async index(req: Request, res: Response) {
        const categories: categories[] = await prisma.categories.findMany({
            where: {
                parent_id: Number(req.params.id),
            }
        });
        
        res.render('category/index', {
            'categories': categories,
            auth: req.session.auth,
            name: req.session.name,
        });
    }

    async indexItem(req: Request, res: Response) {

        const items = await prisma.items.findFirst({
            where: {
                id: Number(req.params.id)
            }
        });
        console.log(items);
        res.render('catalog/index', {
            'items': items,
            auth: req.session.auth,
            name: req.session.name
        });
    }

    async showItem(req: Request, res: Response) {
        const items: items[] = await prisma.items.findMany({
            where: {
                category_id: Number(req.params.id)
            }
        });
        
        res.render('catalog/show', {
            'items': items,
            auth: req.session.auth,
            name: req.session.name,
        });
    }


}