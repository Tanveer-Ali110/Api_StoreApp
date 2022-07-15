import { Sequelize } from "sequelize";
import UserModel from "../models/user.model";
import * as defaulTypes from "./defaultTypes";

export const initUserModel = (sequelize: Sequelize) => {
  UserModel.init(
    {
      gcuid: defaulTypes.string(false, { primaryKey: true }),
      username:defaulTypes.string(false,{validate: { isLowercase: true }}),
      first_name: defaulTypes.string(false, { validate: { isLowercase: true }}),
      last_name: defaulTypes.string(false, { validate: { isLowercase: true }}),
      email_address: defaulTypes.string(false,{ validate: { isLowercase: true }}),
      password: defaulTypes.string(false),
      phone_number: defaulTypes.uint(true)
    },
    {
      tableName: "Users",
      sequelize,
      timestamps: true,
    }
  );
};
