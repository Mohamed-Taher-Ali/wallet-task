import { WalletAttributes } from './../models/wallet';
import { UserAttributes } from './../models/user';
import { throwErrorIf } from './helpers';
import { TransactionModel } from './../models/transaction';
import { RoleEnum, TransactionEnum, ErrorMessageEnum } from './../constants/types';
import { User, UserModel } from '../models/user';
import { sequelize } from './../instances/sequalize';
import { Transaction } from '../models/transaction';
import { Wallet, WalletModel } from '../models/wallet';
import { checkWalletIsSufficient } from '../services/wallet';


export const registerTransaction = (userBody, amount) =>{
    let ret = {};

    return  new Promise((resolve, reject) => {
        //tranasction of greeting wallet
        sequelize.transaction(async (t) => {
            return User.create(
                userBody as UserModel,
                { transaction: t }
            )
                .then(async (user) => {
                    let {password, ...others} = user.toJSON() as UserAttributes
                    ret = others;

                    const admin = await User.findOne({
                        where: { role: RoleEnum.APP }
                    });

                    const transactionData = {
                        transactionType: TransactionEnum.APP_TRANSFER,
                        fromUserId: admin.id,
                        toUserId: user.id,
                        amount,
                    };

                    return Transaction.create(
                        transactionData as TransactionModel,
                        { transaction: t }
                    )
                        .then((transaction) => {

                            const walletData = {
                                transactionId: transaction.id,
                                userId: user.id,
                                amount: 100,
                            };

                            return Wallet.create(
                                walletData as WalletModel,
                                { transaction: t }
                            );
                        })
                })
                .then(function () { resolve(ret); return t.commit(); })
                .catch(function (err) { reject(err); return t.rollback(); });
        });
    });
}


export const normalTransaction = (fromUserId, toUserId, amount) =>
new Promise(async(resolve, reject) => {

try {
    throwErrorIf(
        await checkWalletIsSufficient(fromUserId, amount),
        ErrorMessageEnum.NO_SUFFICIENT_WALLET
    );
} catch (error) {
    
}

    sequelize.transaction(async (t) => {

                const transactionData = {
                    transactionType: TransactionEnum.USER_TRANSFER,
                    fromUserId,
                    toUserId,
                    amount,
                };

                return Transaction.create(
                    transactionData as TransactionModel,
                    { transaction: t }
                )
                    .then((transaction) => {

                        const walletData = {
                            transactionId: transaction.id,
                            userId: toUserId,
                            amount,
                        };

                        return Wallet.create(
                            walletData as WalletModel,
                            { transaction: t }
                        );
                    })
            .then(function (wallet) {
                resolve(wallet.toJSON() as WalletAttributes);
                return t.commit(); 
            })
            .catch(function (err) { reject(err); return t.rollback(); });
    });
})