import { Express } from 'express-serve-static-core';

import { transactions } from './transactions';
import { wallets } from './wallets';
import { users } from './users';


const routes = {
    transactions,
    wallets,
    users,
};

export const appRouter = (app: Express) => {
    Object.entries(routes).map(([name, router]) => {
        app.use(`/api/${name}`, router);
    })
};