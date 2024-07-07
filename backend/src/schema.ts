import { buildSchemaSync } from "type-graphql";
import User from "../entities/User";

export default buildSchemaSync({
  resolvers: [User],
});
