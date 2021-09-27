import { Router, Request } from 'express';

import { transferToOther } from '../services/transaction';
import { authGuard } from './../utils/middlewares';

export const transactions = Router();

transactions

    .post('/transferToOther', [authGuard], async (req, res) => {
        const result = await transferToOther(Number(req['user']['id']), req.body);
        res.send(result);
    })