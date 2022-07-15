import { Sequelize } from "sequelize";
import UserModel from "../models/user.model";
import * as defaulTypes from "./defaultTypes";

export const initUserModel = (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: defaulTypes.uint(false, { primaryKey: true }),
      firstName: defaulTypes.string(false, { validate: { isLowercase: true } }),
      lastName: defaulTypes.string(false, { validate: { isLowercase: true } }),
      phoneNumber: defaulTypes.uint(true),
      password: defaulTypes.string(false),
      confirmPassword: defaulTypes.string(false),
    },
    {
      tableName: "Users",
      sequelize,
      timestamps: true,
    }
  );
};
