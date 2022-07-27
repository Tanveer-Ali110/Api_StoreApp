import { Sequelize } from "sequelize";
import * as defaulTypes from "./defaultTypes";
import { Discription, Scenario } from "../models";

export const initDiscriptionModel = (sequelize: Sequelize) => {
  Discription.init(
    {
      id: defaulTypes.string(false, { primaryKey: true }),
      pre: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      verb: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      first_line: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      second_line: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
    },
    {
      tableName: "Discriptions",
      sequelize,
      timestamps: true,
    });
    // Discription.hasOne(Scenario,{as: 'description_id', foreignKey : 'description_id' })
};
