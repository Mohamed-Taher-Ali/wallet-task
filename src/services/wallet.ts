import { WalletModel } from './../models/wallet';
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

    const wallet = await Wallet.create(walletBody as WalletModel);
    return (wallet.toJSON() as WalletAttributes);
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
        total + (w.toJSON() as WalletAttributes).amount, 0
    );
};


export const balanceReport = async (
    userId: number
): Promise<WalletAttributes[]> => {

    const { error } = balanceReportValidation({ userId });
    // throwErrorIf(!!error, error.details[0].message as any);

    const wallets = await Wallet.findAll({
        where: { userId: Number(userId) || 0 }
    });

    return wallets.map(w => (w.toJSON() as WalletAttributes));
};

