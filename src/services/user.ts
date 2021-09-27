import * as jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

import {
    LoginBody,
    RegisterBody,
    LoginResponse,
    ErrorMessageEnum,
    RoleEnum,
} from './../constants/types';
import { loginValidation, registerValidation } from './validations';
import { registerTransaction } from '../utils/transaction';
import { User, UserAttributes } from "../models/user";
import { throwErrorIf } from '../utils/helpers';
import env from '../constants/env';


export const register = async (
    userBody: RegisterBody
): Promise<UserAttributes> => {

    const { error } = registerValidation(userBody);
    throwErrorIf(!!error, error.details[0].message as any);

    const isExistUser = await User.findOne({
        where: { mobile: userBody.mobile }
    });

    throwErrorIf(
        (!!(isExistUser?.toJSON() as UserAttributes)?.id),
        ErrorMessageEnum.Not_Allowed_Email
    );

    userBody.role = RoleEnum.USER;
    userBody.password = await hash(userBody.password, 10);

    return await registerTransaction(userBody, 100) as UserAttributes;
};


export const login = async (
    userBody: LoginBody
): Promise<Partial<LoginResponse>> => {

    const { error } = loginValidation(userBody);
    // throwErrorIf(!!error, error.details[0].message as any);

    const user = await User.findOne({
        where: { mobile: userBody.mobile }
    });

    const pass = await compare(userBody.password, user.password);
    
    throwErrorIf(
        !(user?.toJSON() as UserAttributes)?.id || !pass,
        ErrorMessageEnum.Error_In_Login_Data
    );

    const token = await jwt.sign({id: (user.toJSON() as UserAttributes).id}, env.SECRET);
    const {password, ...others} = (user.toJSON() as UserAttributes);

    return { ...others, token };
};