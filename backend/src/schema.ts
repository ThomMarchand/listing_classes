import { buildSchemaSync } from "type-graphql";
import UserResolver from "./resolvers/user.resolver";

export default buildSchemaSync({
  resolvers: [UserResolver],
});
