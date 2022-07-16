import { Sequelize } from "sequelize";
import { User } from "../models";
import * as defaulTypes from "./defaultTypes";

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      gcuid: defaulTypes.string(false, { primaryKey: true }),
      username: defaulTypes.string(false, { validate: { isLowercase: true } }),
      first_name: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      last_name: defaulTypes.string(false, { validate: { isLowercase: true } }),
      email_address: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      password: defaulTypes.string(false),
      phone_number: defaulTypes.uint(true),
    },
    {
      tableName: "Users",
      sequelize,
      timestamps: true,
    }
  );
};
