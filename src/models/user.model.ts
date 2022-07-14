import { Model } from "sequelize";

export default class User extends Model {
  public id!: number;

  public firstName!: string;

  public lastName!: string;

  public phoneNumber?: number;

  public password!: string;

  public confirmPassword!: string;
}
