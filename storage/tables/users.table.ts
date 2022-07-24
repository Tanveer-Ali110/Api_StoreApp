import { Sequelize } from "sequelize";
import { User } from "../models";
import * as defaulTypes from "./defaultTypes";

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      gcuid: defaulTypes.string(false, { primaryKey: true }),
      username: defaulTypes.string(false, {unique:true}),
      first_name: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      last_name: defaulTypes.string(false, { validate: { isLowercase: true } }),
      email_address: defaulTypes.string(false),
      password: defaulTypes.string(false),
      phone_number: defaulTypes.uint(true),
      address_country: defaulTypes.string(true),
      user_address_state: defaulTypes.string(true),
      user_address_street: defaulTypes.string(true),
      user_address_city: defaulTypes.string(true),
      user_address_zip: defaulTypes.uint(true),
      verification_status: defaulTypes.bool(true),
      status: defaulTypes.bool(true),
      transactions_count: defaulTypes.uint(true),
      scenarios_count: defaulTypes.uint(true),
      joinedcommunities_count: defaulTypes.uint(true),
      notifications_count: defaulTypes.uint(true),
      contracts_count: defaulTypes.uint(true),
      // user_type: defaulTypes.enums(true, ["abc,xyz"]),
    },
    {
      tableName: "Users",
      sequelize,
      timestamps: true,
    }
  );
};
