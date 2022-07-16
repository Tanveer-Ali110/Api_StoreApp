import { Sequelize } from "sequelize";
import * as defaulTypes from "./defaultTypes";
import { Discription } from "../models";

export const initDiscriptionModel = (sequelize: Sequelize) => {
  Discription.init(
    {
      id: defaulTypes.uint(false, { primaryKey: true }),
      description_pre: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      description_verb: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      description_first_line: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
      description_second_line: defaulTypes.string(false, {
        validate: { isLowercase: true },
      }),
    },
    {
      tableName: "Discriptions",
      sequelize,
      timestamps: true,
    }
  );
};
