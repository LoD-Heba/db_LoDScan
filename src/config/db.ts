import { Sequelize } from "sequelize-typescript";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!,
    {
        dialect: "postgres",
        logging: false,
        models: [__dirname + "/../models"],
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