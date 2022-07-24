import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as uuid from "uuid";
import { isEmpty } from "lodash";
import * as bcrypt from "bcrypt";
import { User } from "../storage/models";
import { initSequelize } from "../storage/tables";
import { func500Error, funcSuccess, funcValidationError } from "../src/utils";
import { createUserAccessToken } from "../src/utils/authenticate";

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  try {
    await initSequelize();

    if (req.method === "POST") await create(context, req);
  } catch (err) {
    func500Error(context);
  }
};

const create = async (context: Context, req: HttpRequest): Promise<any> => {
  const { firstName, lastName, emailAddress, password, cellNo } = req.body;

  if (isEmpty(firstName))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(lastName))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(emailAddress))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(password))
    return funcValidationError(context, "required fills are invalid");

  let saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const result = await User.create({
      gcuid: uuid.v4(),
      username: emailAddress,
      first_name: firstName.toLowerCase(),
      last_name: lastName.toLowerCase(),
      email_address: emailAddress,
      phone_number: cellNo,
      password: hashedPassword,
    });
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
  } catch (err) {
    return funcValidationError(context, err);
  }
};

export default httpTrigger;
