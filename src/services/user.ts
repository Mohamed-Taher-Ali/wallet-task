import * as jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';

import {
    LoginBody,
    RegisterBody,
    LoginResponse,
    ErrorMessageEnum,
} from './../constants/types';
import { User, UserAttributes } from "../models/user";
import { throwErrorIf } from '../utils/helpers';
import env from '../constants/env';
import { loginValidation, registerValidation } from './validations';


export const register = async (
    userBody: RegisterBody
): Promise<UserAttributes> => {

    const { error } = registerValidation(userBody);
    throwErrorIf(!!error, error.details[0].message as any);

    const isExistUser = await User.findOne({
        where: { mobile: userBody.mobile }
    });

    throwErrorIf(
        !(!!isExistUser?._attributes?.id),
        ErrorMessageEnum.Not_Allowed_Email
    );

    userBody.password = await hash(userBody.password, 10);
    const user = await User.create(userBody);

    return user._attributes;
};


export const login = async (
    userBody: LoginBody
): Promise<LoginResponse> => {

    const { error } = loginValidation(userBody);
    throwErrorIf(!!error, error.details[0].message as any);
    
    userBody.password = await hash(userBody.password, 10);

    const user = await User.findOne({
        where: { ...userBody }
    });

    throwErrorIf(
        !user?._attributes?.id,
        ErrorMessageEnum.Error_In_Login_Data
    );

    const token = await jwt.sign(userBody.password, env.SECRET);

    return { ...user._attributes, token };
};