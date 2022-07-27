import { Sequelize } from "sequelize";
import { storageSettings } from "../../src/constant";
import { initDiscriptionModel } from "./discription.table";
import { initScenarioModel } from "./scenario.table";
import { initUserModel } from "./users.table";

let sequelize: Sequelize | null = null;

export const initSequelize = async (): Promise<Sequelize> => {
  if (sequelize !== null) return sequelize;

  sequelize = new Sequelize({
    database: storageSettings.database,
    username: storageSettings.username,
    password: storageSettings.password,
    host: storageSettings.host,
    port: 3306,
    logging: false,
    dialect: "mysql",
    pool: {
      max: 15,
      min: 5,
      idle: 5000,
      evict: 15000,
      acquire: 30000,
    },
  });

  initUserModel(sequelize);
  initDiscriptionModel(sequelize);
  initScenarioModel(sequelize);

  // Create new tables
  await sequelize.sync();

  return sequelize;
};
