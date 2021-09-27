import { sequelize } from './../instances/sequalize';
import { RoleEnum } from './../constants/types';
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    id?: number;
    role: RoleEnum;
    name: string;
    mobile: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface UserModel extends Model<UserAttributes>, UserAttributes {};

export class User extends Model<UserAttributes, UserModel> implements UserAttributes {
    public id?: number;

    public role: RoleEnum;
    public name: string;
    public mobile: string;
    public password: string;
    
    public createdAt?: Date;
    public updatedAt?: Date;
};

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(RoleEnum)
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: Object.values(RoleEnum)
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},
{
    sequelize,
    modelName: 'users'
});