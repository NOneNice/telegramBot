import {Column, DataType, Model, Table} from "sequelize-typescript";



interface productAttrs {
    name: string
    count: number
}


@Table({tableName: 'product', timestamps: false})
export class Product extends Model<Product,productAttrs > {
    @Column({type: DataType.INTEGER, unique: true, autoIncrementIdentity: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique:false, allowNull: false })
    name: string

    @Column({type: DataType.INTEGER})
    count: number
}
