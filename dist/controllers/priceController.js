"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceController = void 0;
class StartService {
    getPrice() {
        return 25;
    }
    getDescription() {
        return "Услуги: сервис";
    }
}
class FirstService {
    constructor(service) {
        this.service = service;
    }
    getPrice() {
        return 15 + this.service.getPrice();
    }
    getDescription() {
        return this.service.getDescription() + ", еда";
    }
}
class SecondService {
    constructor(service) {
        this.service = service;
    }
    getPrice() {
        return 15 + this.service.getPrice();
    }
    getDescription() {
        return this.service.getDescription() + ", жилье";
    }
}
class ThirdService {
    constructor(service) {
        this.service = service;
    }
    getPrice() {
        return 15 + this.service.getPrice();
    }
    getDescription() {
        return this.service.getDescription() + ", проживание";
    }
}
class PriceController {
    price(req, res) {
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
exports.PriceController = PriceController;
