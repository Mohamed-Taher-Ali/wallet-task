import { User } from './../models/user';
import { Sequelize } from 'sequelize'

const
    db = 'taskdb',
    username = 'root',
    password = 'root',
    host = 'localhost';

export const sequelize = new Sequelize(
    db,
    username,
    password,
    {
        host,
        port: 3306,
        dialect: "mysql",
    }
);

export const runSql = () => {
    try {
        sequelize.sync();
        console.log('db connected succefully ....');
        return sequelize;
    } catch (error) {
        console.log('db failed to connect ....');
    }
}