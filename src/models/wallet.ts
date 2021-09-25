import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface WalletAttributes {
    id?: number;

    amount: number;
    userId: number;
    transactionId: number;

    createdAt?: Date;
    updatedAt?: Date;
};

export interface WalletModel extends Model<WalletAttributes>, WalletAttributes { };

export class Wallet extends Model<WalletModel, WalletAttributes> { };

export type WalletStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): WalletModel;
};

export function WalletFactory(sequelize: Sequelize): WalletStatic {
    return <WalletStatic>sequelize.define("wallets", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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