import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

import { ErrorMessageEnum, TokenPayload } from './../constants/types';


export const throwErrorIf = (
    condition: boolean,
    message: ErrorMessageEnum,
    errorCode: number = 401
) => {
    // if (condition)
    // throw Error(message + errorCode);
}

export const getPayloadFromToken = async (token: string): Promise<TokenPayload> => {
    const
        jwtPayload = await jwt.decode(token, { complete: true }),
        payload = jwtPayload.payload as TokenPayload;

    // throwErrorIf(!payload?.id, ErrorMessageEnum.UNAUZENTICATED, 401);

    return payload;
}

