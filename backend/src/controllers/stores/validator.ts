import Joi from "joi";

export const newStoreValidator = Joi.object({
    name: Joi.string().max(255).required(),
    categoryId: Joi.string().uuid().required(),
    address: Joi.string().max(255).required()
})

export const getStoresPerCategoryValidator = Joi.object({
    categoryId: Joi.string().uuid().required()
})

export const deleteStoreValidator = Joi.object({
    id: Joi.string().uuid().required()
})