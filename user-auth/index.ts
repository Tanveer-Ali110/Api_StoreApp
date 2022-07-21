import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as bcrypt from "bcrypt";
import User from "../storage/models/user.model";
import { initSequelize } from "../storage/tables";
import { func500Error, funcSuccess, funcValidationError } from "../src/utils";
import { createUserAccessToken } from "../src/utils/authenticate";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await initSequelize();

    if (req.method === "POST") await createAccessToken(context, req);
  } catch (err) {
    func500Error(context);
  }
};

const createAccessToken = async (context: Context, req: HttpRequest) => {
  const { emailAddress, password } = req.body;

  const user: any = await User.findOne({
    where: { username: emailAddress?.toLowerCase() },
  });
  if (!user || !(user instanceof User))
    return funcValidationError(context, "invalid username or password");

  const isAuthenticate = await bcrypt.compare(password, user.password);
  if (!isAuthenticate)
    return funcValidationError(context, "invalid username or password");

  const accessToken = await createUserAccessToken(user);

  return funcSuccess(context, { user: user.toJSON(), accessToken });
};

export default httpTrigger;
