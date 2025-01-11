import { User } from './user.interface';
import { userModel } from './user.model';
import bcrypt from 'bcrypt';

const registerUserIntoDB = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  const result = await userModel.create(newUser);

  const userData = {
    _id: result?._id,
    username: result?.username,
    email: result?.email,
  };
  return userData;
};

export const userServices = {
  registerUserIntoDB,
};
