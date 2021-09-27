import { Router, Request } from 'express';

import { roleGuard } from './../utils/middlewares';
import { balanceReport } from '../services/wallet';
import { RoleEnum } from '../constants/types';


export const wallets = Router();

wallets

    .get('/balanceReport', [roleGuard(RoleEnum.APP)], async (req: Request, res) => {
        const result = await balanceReport(Number(req.query.userId as string));
        res.send(result);
    })