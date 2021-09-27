import { UserAttributes } from './../models/user';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';

import { ErrorMessageEnum, RoleEnum } from './../constants/types';
import { throwErrorIf, getPayloadFromToken } from './helpers';


export const authGuard = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = await getPayloadFromToken(req.headers.authorization);
        
        req.user = {
            id: payload.id
        };
    } catch (error) {

    }

    next();
}

export const roleGuard = (...roles: RoleEnum[]) => async (
    req: any,
    res: Response,
    next: NextFunction
) => {

    try {
        const
            payload = await getPayloadFromToken(req.headers.authorization),
            user = await User.findOne({ where: { id: payload.id } });

        req.user.id = payload.id;

        throwErrorIf(
            !roles.includes((user.toJSON() as UserAttributes).role),
            ErrorMessageEnum.UNAUTHORIZED
        );
    } catch (error) { }

    next();
}