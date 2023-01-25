import { Cat, CatType } from "./cats.model";
import { Request, Response } from "express";

const readAllCat = (req: Request, res: Response) => {
    try {
        const cats: CatType[] = Cat;
        res.status(200).send({
            success: true,
            data: { cats }
        });
    }
    catch(error){
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}

const readCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        console.log(params);
        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        });
        res.status(200).send({
            success: true,
            data: { cat }
        });
    }
    catch(error){
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}

const createCat = (req: Request, res: Response) => {
    try {
        const data = req.body;
        Cat.push(data);
        res.status(200).send({
            success: true,
            data: { data }
        });
    }
    catch(error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}

const updateCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach(cat => {
            if(cat.id === params.id){
                cat = body;
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: { result }
        });
    }
    catch(error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}

const updatePartiallyCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach(cat => {
            if(cat.id === params.id){
                cat = {...cat, ...body};
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: { result }
        });
    }
    catch(error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}

const deleteCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const newCat = Cat.filter(cat => cat.id !== params.id);
        res.status(200).send({
            success: true,
            data: { newCat }
        });
    }
    catch(error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}

export { readAllCat, readCat, createCat, updateCat, updatePartiallyCat, deleteCat };