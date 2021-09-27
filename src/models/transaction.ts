import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { TransactionEnum } from './../constants/types';
import { sequelize } from './../instances/sequalize';

export interface TransactionAttributes {
    id?: number;

    amount: number;
    toUserId: number;
    fromUserId: number;
    transactionType: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export interface TransactionModel extends Model<TransactionAttributes>, TransactionAttributes { };

export class Transaction extends Model<TransactionAttributes, TransactionModel> {
    public id?: number;

    public amount: number;
    public toUserId: number;
    public fromUserId: number;
    public transactionType: string;

    public createdAt?: Date;
    public updatedAt?: Date;
};

export type TransactionStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): TransactionModel;
};

export function TransactionFactory(sequelize: Sequelize): TransactionStatic {
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
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
};

Transaction.init({
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
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
    {
        sequelize,
        modelName: 'transactions'
    });