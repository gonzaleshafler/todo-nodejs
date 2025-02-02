import { DataSource } from "typeorm";
import { ToDo } from "./entity/ToDo";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ToDo],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => console.log("DB connected!"))
  .catch((err) => console.error("DB connection error:", err));
