import { Request, Response } from 'express';
import { categories, PrismaClient } from '@prisma/client';
import { Logger } from "../logger/logger";
import * as ip from 'ip';
import { renderObject } from '../functions';
import { addLog } from '../logger/addLog';

const prisma: PrismaClient = new PrismaClient();

export class CategoriesController {

    async show(req: Request, res: Response) {
        const categories: categories[] = await prisma.categories.findMany({
            where:{
                parent_id: 0
            }
        });
        
        console.log(categories)
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
            type: ${req.body.type_id}
            ip: ${ip.address()}`
        );

        res.redirect('/catalog');
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

        res.redirect('/catalog');
    }

    async games(req: Request, res: Response) {
        const categories: categories[] = await prisma.categories.findMany({
            
            where:{
                type_id: 1, 
            }
        });
        console.log(categories)
        res.render('categories/games', {
            'games': categories,    
            auth: req.session.auth,
            name: req.session.name,
        });
    }

}