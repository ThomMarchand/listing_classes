import { GraphQLError } from "graphql";

import User, { CreateUserInput } from "../entities/User";

export default class UserService {
  static createUser = async (data: CreateUserInput) => {
    const newUser = new User();

    Object.assign(newUser, data);

    return await newUser.save();
  };

  static getAllUsers = async () => {
    const getUsers = await User.find();

    return getUsers;
  };

  static findUser = async (userSearch: {}) => {
    const user = await User.findOneBy(userSearch);

    return user;
  };
}
