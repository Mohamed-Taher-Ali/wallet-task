import { WalletAttributes } from './../models/wallet';
import { TransactionAttributes, TransactionModel } from './../models/transaction';
import { addToWallet, checkWalletIsSufficient } from "./wallet";
import { Transaction } from './../models/transaction';
import { throwErrorIf } from '../utils/helpers';
import { User, UserAttributes } from './../models/user';
import {
    RoleEnum,
    TransactionBody,
    TransactionEnum,
    ErrorMessageEnum,
} from './../constants/types';
import { transferToOtherValidation } from './validations';
import { normalTransaction } from '../utils/transaction';


export const transferToOther = async (
    userId: number,
    transactionBody: TransactionBody
): Promise<WalletAttributes> => {

    const { error } = transferToOtherValidation({ userId, ...transactionBody });
    // throwErrorIf(!!error, error.details[0].message as any);

    const { amount, receiverMobile } = transactionBody;

    try {
        const receiver = await User.findOne({
            where: { mobile: receiverMobile }
        });

        if ((receiver.toJSON() as UserAttributes).id == userId)
            return;

        return await normalTransaction(
            userId,
            (receiver.toJSON() as UserAttributes).id,
            amount
        ) as WalletAttributes;
        
    } catch (error) {

    }

    // let transactionType = TransactionEnum.APP_TRANSFER;

    // if((sender.toJSON() as UserAttributes).role != RoleEnum.APP){
    //     throwErrorIf(
    //         await checkWalletIsSufficient(userId, amount),
    //         ErrorMessageEnum.NO_SUFFICIENT_WALLET
    //     );
    //     transactionType = TransactionEnum.USER_TRANSFER;
    // }

    // const receiver = await User.findOne({
    //     where: { mobile: receiverMobile }
    // });

    // const transaction = await Transaction.create({
    //     toUserId: (receiver.toJSON() as UserAttributes).id,
    //     fromUserId: userId,
    //     transactionType,
    //     amount,
    // } as TransactionModel);

    // await addToWallet({
    //     transactionId: (transaction.toJSON() as TransactionAttributes).id,
    //     userId: (receiver.toJSON() as UserAttributes).id,
    //     amount,
    // });

    // return transaction.toJSON() as TransactionAttributes;
};