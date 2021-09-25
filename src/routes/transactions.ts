import { Router, Request } from 'express';

import { transferToOther } from '../services/transaction';
import { authGuard } from './../utils/middlewares';

export const transactions = Router();

transactions

    .post('transferToOther', [authGuard], async (req: Request, res) => {
        const result = await transferToOther(req['user']['id'] as any, req.body);
        res.send(result);
    })