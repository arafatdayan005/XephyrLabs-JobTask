import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../User/user.model';
import { loginUser } from './auth.interface';
import AuthError from '../../errors/authError';

const loginUser = async (payload: loginUser) => {
  const user = await userModel
    .findOne({ email: payload?.email })
    .select('+password');

  if (!user) {
    throw new AuthError('This user is not found!', 404);
  }

  if (!(await bcrypt.compare(payload?.password, user?.password)))
    throw new AuthError('Password do not matched', 404);

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: '10d',
  });
  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    token: accessToken,
  };
};

export const authServices = {
  loginUser,
};
