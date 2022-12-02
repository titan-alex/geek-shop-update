import { Request, Response } from 'express';

interface CheckBoxes {
    getPrice(): number;
    getDescription(): string;
}

class StartService implements CheckBoxes {
    getPrice(): number {
        return 25;
    }

    getDescription(): string {
        return "Услуги: сервис"
    }
}

class FirstService implements CheckBoxes {
    private service: CheckBoxes;
    constructor(service: CheckBoxes) {
        this.service = service;
    }

    getPrice(): number {
        return 15 + this.service.getPrice();
    }

    getDescription(): string {
        return this.service.getDescription() + ", еда";
    }
}
class SecondService implements CheckBoxes {
    private service: CheckBoxes;
    constructor(service: CheckBoxes) {
        this.service = service;
    }
    getPrice(): number {
        return 15 + this.service.getPrice();
    }

    getDescription(): string {
        return this.service.getDescription() + ", жилье";
    }
}
class ThirdService implements CheckBoxes {
    private service: CheckBoxes;
    constructor(service: CheckBoxes) {
        this.service = service;
    }
    getPrice(): number {
        return 15 + this.service.getPrice();
    }

    getDescription(): string {
        return this.service.getDescription() + ", проживание";
    }
}

export class PriceController {
    price(req: Request, res: Response) {
        const { first, second, third } = req.body;

        let value = new StartService();
        if (first != undefined) {
            value = new FirstService(value);
        }
        if (second != undefined) {
            value = new SecondService(value);
        }
        if (third != undefined) {
            value = new ThirdService(value);
        }

        res.render('showprice', {
            'value': value.getPrice(),
            'description': value.getDescription()
        });
    }
}