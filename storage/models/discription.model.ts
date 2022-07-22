import { Model } from "sequelize";

export default class Discription extends Model {
  public id!: string;

  public description_pre!: string;

  public description_verb!: string;

  public description_first_line!: string;

  public description_second_line!: string;
}
