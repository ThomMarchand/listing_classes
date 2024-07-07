import { DataSource } from "typeorm";
import User from "../entities/User";

const db = new DataSource({
  type: "sqlite",
  database: "test.sqlite",
  entities: [User],
  synchronize: true,
  logging: true,
});

export const initializeDB = async (): Promise<void> => {
  try {
    await db.initialize();

    console.log("Database successfully initialized");
  } catch (e: any) {
    console.log(`Database failed to connect ${e.message}`);
  }
};

export default db;
