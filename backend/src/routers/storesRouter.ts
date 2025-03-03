import { Router } from "express";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/param-validation";
import { deleteStoreValidator, getStoresPerCategoryValidator, newStoreValidator } from "../controllers/stores/validator";
import { addStore, getAllStores, getStoresPerCategory, removeStore } from "../controllers/stores/controller";


const storesRouter = Router()

storesRouter.get('/', getAllStores)
storesRouter.get('/:categoryId', paramsValidation(getStoresPerCategoryValidator), getStoresPerCategory)
storesRouter.post('/', validation(newStoreValidator), addStore)
storesRouter.delete('/:id', paramsValidation(deleteStoreValidator), removeStore)

export default storesRouter