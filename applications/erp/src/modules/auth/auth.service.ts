import bcrypt from 'bcrypt';
import { generateToken } from './utils/jwt.js';
import { db } from '../../common/models/index.js';
import { UserAttributes } from 'src/common/models/User.model.js';

const User = db.models.User;

const register = async(userData: any) => {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) throw new Error('Email already exists');

    const user = (await User.create(userData)).get({ plain: true }) as UserAttributes;
    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
}

const login = async (email: string, password: string) => {
    const userModel = await User.findOne({ where: { email } });
    if (!userModel) throw new Error('User not found');

    const user = userModel.dataValues;
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
}

export {login, register}