import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

import User, { CreateUserInput, SigninInput } from "../entities/User";
import UserService from "../service/user.service";
import { Context } from "../interface/auth";
import env from "../env";

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    const getUsers = await UserService.getAllUsers();

    return getUsers;
  }

  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: CreateUserInput) {
    const userAlreadyExist = await UserService.findUser({ email: data.email });

    if (userAlreadyExist) {
      throw new GraphQLError(`${data.email} already exist`);
    }

    const newUser = await UserService.createUser(data);

    return newUser;
  }

  @Mutation(() => String)
  async signin(@Arg("data") data: SigninInput, @Ctx() ctx: Context) {
    const userAlreadyExist = await UserService.findUser({ email: data.email });

    if (!userAlreadyExist) {
      throw new GraphQLError("bad credential");
    }

    const IsUserPassword = await verify(
      userAlreadyExist.hashedPassword,
      data.password
    );

    if (!IsUserPassword) {
      throw new GraphQLError("bad credential");
    }

    const token = jwt.sign(
      {
        userId: userAlreadyExist.id,
      },
      env.JWT_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    ctx.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: env.NODE_ENV === "production",
    });

    console.log(token);

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: Context) {
    ctx.res.clearCookie("token");

    return "logout";
  }
}
