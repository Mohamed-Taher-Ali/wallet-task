import * as joi from 'joi';

export function registerValidation(body) {
    let schema = joi.object({
        role: joi.string().required(),
        name: joi.string().required(),
        mobile: joi.string().min(12).required(),
        password: joi.string().min(5).required(),
    }) ;
    return schema.validate(body);
}

export function loginValidation(body) {
    let schema = joi.object({
        mobile: joi.string().min(12).required(),
        password: joi.string().min(5).required(),
    }) ;
    return schema.validate(body);
}

export function transferToOtherValidation(body) {
    let schema = joi.object({
        userId: joi.number().required(),
        amount: joi.number().required(),
        receiverMobile: joi.string().min(12).required(),
    }) ;
    return schema.validate(body);
}

export function addToWalletValidation(body) {
    let schema = joi.object({
        userId: joi.number().required(),
        amount: joi.number().required(),
        transactionId: joi.number().required(),
    }) ;
    return schema.validate(body);
}

export function checkWalletIsSufficientValidation(body) {
    let schema = joi.object({
        userId: joi.number().required(),
        amount: joi.number().required(),
    }) ;
    return schema.validate(body);
}

export function balanceReportValidation(body) {
    let schema = joi.object({
        userId: joi.number().required(),
    }) ;
    return schema.validate(body);
}