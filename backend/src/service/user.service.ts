import { GraphQLError } from "graphql";

import User, { CreateUserInput } from "../entities/User";

export default class UserService {
  static createUser = async (data: CreateUserInput) => {
    const userAlreadyExist = await User.find({ where: { email: data.email } });

    if (userAlreadyExist.length > 0) {
      throw new GraphQLError(`${data.email} already exist`);
    }

    const newUser = new User();

    Object.assign(newUser, data);

    return await newUser.save();
  };

  static getAllUsers = async () => {
    const getUsers = await User.find();

    return getUsers;
  };
}
