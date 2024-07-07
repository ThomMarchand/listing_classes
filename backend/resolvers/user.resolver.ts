import { Arg, Mutation, Query, Resolver } from "type-graphql";

import User, { CreateUserInput } from "../entities/User";
import UserService from "../service/user.service";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    const getUsers = await UserService.getAllUsers();

    return getUsers;
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const newUser = await UserService.createUser(data);

    return newUser;
  }
}
