import { throwErrorIf } from './../utils/helpers';
import { WalletBody } from './../constants/types';
import { Wallet, WalletAttributes } from "../models/wallet";
import {
    addToWalletValidation,
    balanceReportValidation,
    checkWalletIsSufficientValidation
} from './validations';


export const addToWallet = async (
    walletBody: WalletBody
): Promise<WalletAttributes> => {

    const { error } = addToWalletValidation(walletBody);
    throwErrorIf(!!error, error.details[0].message as any);

    const wallet = await Wallet.create(walletBody);
    return wallet._attributes;
};


export const checkWalletIsSufficient = async (
    userId: number, amount: number,
): Promise<boolean> => {

    const { error } = checkWalletIsSufficientValidation({userId, amount});
    throwErrorIf(!!error, error.details[0].message as any);

    const senderWallets = await Wallet.findAll({
        where: { userId }
    });

    return amount <= senderWallets.reduce((total, w) =>
        total + w._attributes.amount, 0
    );
};


export const balanceReport = async (
    userId: string
): Promise<WalletAttributes[]> => {

    const { error } = balanceReportValidation({ userId });
    throwErrorIf(!!error, error.details[0].message as any);

    const wallets = await Wallet.findAll({
        where: { userId: Number(userId) || 0 }
    });

    return wallets.map(w => w._attributes);
};

