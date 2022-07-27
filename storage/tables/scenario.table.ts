import { Sequelize, ENUM } from "sequelize";
import * as defaulTypes from "./defaultTypes";
import { Discription, Scenario } from "../models";

export const initScenarioModel = (sequelize: Sequelize) => {
  Scenario.init(
    {
      id: defaulTypes.string(false, { primaryKey: true }),
      description_id: defaulTypes.string(false),
      attached_tags: defaulTypes.string(true),
      sq1_state: defaulTypes.enums(
        true,
        [
          "Generic",
          "community fee",
          "Verifier",
          "conflict resolver",
          "Investor",
          "donation",
        ],
        {
          defaultValue: "Generic",
        }
      ),
      sq2_state: defaulTypes.enums(false, ["yes", "no"], {
        defaultValue: "no",
      }),
    },
    {
      tableName: "Scenario",
      sequelize,
      timestamps: true,
    }
  );
  Scenario.belongsTo(Discription, { foreignKey: "description_id" });
};
