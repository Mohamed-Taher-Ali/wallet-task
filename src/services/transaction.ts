import { TransactionAttributes } from './../models/transaction';
import { addToWallet, checkWalletIsSufficient } from "./wallet";
import { Transaction } from './../models/transaction';
import { throwErrorIf } from '../utils/helpers';
import { User } from './../models/user';
import {
    RoleEnum,
    TransactionBody,
    TransactionEnum,
    ErrorMessageEnum,
} from './../constants/types';
import { transferToOtherValidation } from './validations';


export const transferToOther = async(
    userId: number,
    transactionBody: TransactionBody
): Promise<TransactionAttributes> => {

    const { error } = transferToOtherValidation({userId, ...transactionBody});
    throwErrorIf(!!error, error.details[0].message as any);

    const
        { amount, receiverMobile } = transactionBody,
        sender = await User.findByPk(userId);
    
    let transactionType = TransactionEnum.APP_TRANSFER;

    if(sender._attributes.role != RoleEnum.APP){
        throwErrorIf(
            await checkWalletIsSufficient(userId, amount),
            ErrorMessageEnum.NO_SUFFICIENT_WALLET
        );
        transactionType = TransactionEnum.USER_TRANSFER;
    }

    const receiver = await User.findOne({
        where: { mobile: receiverMobile }
    });

    const transaction = await Transaction.create({
        toUserId: receiver._attributes.id,
        fromUserId: userId,
        transactionType,
        amount,
    });

    await addToWallet({
        transactionId: transaction._attributes.id,
        userId: receiver._attributes.id,
        amount,
    });

    return transaction._attributes;
};