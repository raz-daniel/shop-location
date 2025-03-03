import { Sequelize } from "sequelize-typescript";
import config from "config";
import Category from "../model/category";
import Store from "../model/store";


const logging = config.get<boolean>('sequelize.logging') ? console.log : false


const sequelize = new Sequelize({
    models: [Store, Category],
    dialect: 'mysql',
    ...config.get('db'),
    logging
})

export default sequelize