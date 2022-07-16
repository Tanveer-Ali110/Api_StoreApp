import * as jwt from "jsonwebtoken";
import User from "../../storage/models/user.model";
import { authSettings } from "../constant";

export async function createUserAccessToken(user: User) {
  return new Promise<string>((resolve, reject) => {
    if (user != null) {
      jwt.sign(
        {
          payload: {
            id: user.gcuid,
            username: user.first_name?.toLowerCase(),
          },
        },
        authSettings.secret,
        {
          algorithm: authSettings.algorithms[0],
        },
        (err: any, token: any) => {
          if (err) return reject(err);
          if (!token) return new Error("Empty token");
          return resolve(token);
        }
      );
    }
  });
}
