import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';

import { ErrorMessageEnum, RoleEnum } from './../constants/types';
import { throwErrorIf, getPayloadFromToken } from './helpers';


export const authGuard = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const payload = getPayloadFromToken(req);

    req.user.id = (await payload).id;

    next();
}

export const roleGuard = (...roles: RoleEnum[]) => async (
    req: any,
    res: Response,
    next: NextFunction
) => {

    const
    payload = await getPayloadFromToken(req),
    user = await User.findOne({ where: { id: payload.id } });

    req.user.id = (await payload).id;

    throwErrorIf(
        !roles.includes(user._attributes.role),
        ErrorMessageEnum.UNAUTHORIZED
    );

    next();
}