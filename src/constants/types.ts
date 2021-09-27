import { UserAttributes } from './../models/user';

export enum TransactionEnum {
    APP_TRANSFER = 'APP_TRANSFER',
    USER_TRANSFER = 'USER_TRANSFER',
};

export enum RoleEnum {
    USER = 'USER',
    APP = 'APP',
};

export enum ErrorMessageEnum {
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNAUZENTICATED = 'UNAUZENTICATED',
    Error_In_Login_Data = 'Error_In_Login_Data',
    NO_SUFFICIENT_WALLET = 'NO_SUFFICIENT_WALLET',
    Not_Allowed_Email = 'Not_Allowed_Email',
};

export interface TokenPayload {
    id: number
}

export interface RegisterBody {
    role: RoleEnum;
    name: string;
    mobile: string;
    password: string;
}

export interface LoginBody {
    mobile: string;
    password: string;
}

export interface LoginResponse extends UserAttributes {
    token: string;
}

export interface WalletBody {
    amount: number;
    userId: number;
    transactionId: number;
}

export interface TransactionBody {
    amount: number;
    receiverMobile: string;
}