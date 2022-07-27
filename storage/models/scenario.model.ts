import { Model } from "sequelize";

export default class Scenario extends Model {
  public id!: string;

  public description_id!: string;

  public attached_tags?: string;

  public sq1_state?: number;

  public sq2_state?: number;
}
