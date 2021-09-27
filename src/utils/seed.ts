import { hash } from 'bcrypt';
import { UserModel } from './../models/user';
import { RoleEnum } from '../constants/types';
import { User } from '../models/user';

export const seed = async () => {
    try {
        const exist = await User.findOne({});

        if (!exist?.id) {
            await User.create({
                role: RoleEnum.APP, name: 'admin',
                password: await hash('admin', 10),
                mobile: '0000123456789',
            } as UserModel);
        }
    } catch (error) {
        console.log(error);
    }
}