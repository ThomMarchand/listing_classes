import { AuthChecker } from "type-graphql";
import cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

import { Context } from "./interface/auth";
import env from "./env";
import User from "./entities/User";

export const authChecker: AuthChecker<Context> = async (
  { context },
  status: string[] = []
) => {
  const { headers = {} } = context.req || {};
  const tokenInCookie = cookie.parse(headers.cookie ?? "");
  const tokenInAuthHeaders = headers.authorization?.split(" ")[1];

  const token = tokenInAuthHeaders ?? tokenInCookie;

  if (typeof token !== "string") {
    return false;
  }

  const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JwtPayload;

  if (!decoded?.userId) {
    return false;
  }

  const currentUser = await User.findOneByOrFail({ id: decoded?.userId });

  if (currentUser === null) {
    return false;
  }

  context.currentUser = currentUser;

  return status.length === 0 || status.includes(currentUser.status.toString());
};
