import { Sequelize } from "sequelize-typescript";
import colors from "colors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: [__dirname + "/../models/**/*model.ts"],
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(colors.rainbow("Conexion establecida exitosamente."));
  } catch (error) {
    console.error(colors.zebra("Unable to connect to the database:"), error);
  }
};
export default connectDB;
