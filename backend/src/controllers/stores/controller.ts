import { NextFunction, Response, Request } from "express";
import Category from "../../model/category";
import Store from "../../model/store";


export async function getAllStores(req: Request, res: Response, next: NextFunction) {
    try {
        const stores = await Store.findAll({
            include: [{
                model: Category,
                attributes: ['id', 'name']
            }]
        }) 
        res.json(stores)
    } catch (error) {
        next(error)
    }
}

export async function getStoresPerCategory(req: Request<{ categoryId: string }>, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params
        const category = await Category.findByPk(categoryId, {
            include: [Store]
        })
        res.json(category.store)
    } catch (error) {
        next(error)
    }
}


export async function addStore(req: Request<{}, {}, {
    name: string,
    categoryId: string,
    address: string
}>, res: Response, next: NextFunction) {
    try {
        const newStore = await Store.create(req.body)
        res.json(newStore)
    } catch (error) {
        next(error)
    }
}

export async function removeStore(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        await Store.destroy({where: {id}})
        res.json({success: true})
    } catch (error) {
        next(error)
    }
}