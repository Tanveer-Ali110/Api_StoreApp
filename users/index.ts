import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as uuid from "uuid";
import { isEmpty } from "lodash";
import * as bcrypt from "bcrypt";
import { User } from "../storage/models";
import { initSequelize } from "../storage/tables";
import { func500Error, funcSuccess, funcValidationError } from "../src/utils";

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
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (isEmpty(firstName))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(lastName))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(email))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(password))
    return funcValidationError(context, "required fills are invalid");

  let saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await User.create({
      gcuid: uuid.v4(),
      username: email,
      first_name: firstName.toLowerCase(),
      last_name: lastName.toLowerCase(),
      email_address: email,
      phone_number: phoneNumber,
      password: hashedPassword,
    });
    return funcSuccess(context, { user: user.toJSON() });
  } catch (err) {
    return funcValidationError(context, err);
    
  }
};

export default httpTrigger;
