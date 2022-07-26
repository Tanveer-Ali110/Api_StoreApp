import { Context, HttpRequest } from "@azure/functions";
import * as jwt from "jsonwebtoken";
import { isUndefined } from "lodash";
import { authSettings } from "../constant";
import { funcSuccess, funcUnauthorized } from "./functions";

interface IValidateJWTWalletSignOptions extends jwt.VerifyOptions {
  secret: string;
}

export const hasBearerToken = (req: HttpRequest) => {
  return (
    !isUndefined(req?.headers) &&
    !isUndefined(req.headers.authorization || req.headers["func-authorization"])
  );
};

const validateJWTUserSign = async (
  context: Context,
  req: HttpRequest,
  extraOptions: Partial<IValidateJWTWalletSignOptions> = {}
): Promise<void | { id: number; username: string; iat?: number }> => {
  const options = { ...authSettings, ...extraOptions };
  if (!options || !options.secret) throw new Error("secret should be set");
  if (!options.algorithms) throw new Error("algorithms should be set");
  if (!Array.isArray(options.algorithms))
    throw new Error("algorithms must be an array");

  let token: string;
  if (hasBearerToken(req)) {
    const authorization =
      req.headers["func-authorization"] ?? req.headers.authorization ?? "";
    const parts = authorization.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } else {
        return funcUnauthorized(
          context,
          "Format is func-authorization: Bearer [token] or authorization: Bearer [token]"
        );
      }
    } else {
      return funcUnauthorized(
        context,
        "Format is func-authorization: Bearer [token] or authorization: Bearer [token]"
      );
    }
  } else {
    return funcUnauthorized(context);
  }

  try {
    const decodedToken = await new Promise<any>((resolve, reject) => {
      jwt.verify(
        token,
        options.secret,
        options,
        (err: jwt.VerifyErrors | null, decoded: any) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(decoded);
          }
        }
      );
    });
    return decodedToken?.payload;
  } catch (err: any) {
    return funcUnauthorized(context, err?.message ?? "Invalid token");
  }
};

export default validateJWTUserSign;