import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Category from "./category";


@Table({
    underscored: true
})

export default class Store extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column
    name: string

    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    categoryId: string

    @AllowNull(false)
    @Column
    address: string
    
    @BelongsTo(() => Category)
    category: Category

}