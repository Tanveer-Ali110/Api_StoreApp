import { Model } from "sequelize";

export default class User extends Model {
  public gcuid!: string;

  public username?: string;

  public first_name?: string;

  public last_name?: string;

  public email_address?: string;

  public password?: string;

  public phone_number?: number;

  public address_country?: string;

  public user_address_state?: string;

  public user_address_street?: string;

  public user_address_city?: string;

  public user_address_zip?: number;

  public verification_status?: boolean;

  public status?: boolean;

  public transactions_count?: number;

  public scenarios_count?: number;

  public joinedcommunities_count?: number;

  public notifications_count?: number;

  public contracts_count?: number;

  // public user_type:enum
}
