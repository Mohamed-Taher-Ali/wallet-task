import { TransactionEnum } from './../constants/types';
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface TransactionAttributes {
    id?: number;

    amount: number;
    toUserId: number;
    fromUserId: number;
    transactionType: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export interface TransactionModel extends Model<TransactionAttributes>, TransactionAttributes {};

export class Transaction extends Model<TransactionModel, TransactionAttributes> {};

export type TransactionStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): TransactionModel;
};

export function TransactionFactory (sequelize: Sequelize): TransactionStatic {
    return <TransactionStatic>sequelize.define("transactions", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        toUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fromUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transactionType: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(TransactionEnum),
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
};