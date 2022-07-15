import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as uuid from "uuid";
import { isEmpty } from "lodash";
import * as bcrypt from "bcrypt";
import { User } from "../src/models";
import { initSequelize } from "../src/storage";
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
  const { firstName, lastName, email, password,phoneNumber } = req.body;

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
  const user = await User.create({
    gcuid: uuid.v4(),
    username: email.tolowerCase(),
    first_name: firstName.tolowerCase(),
    last_name: lastName.tolowerCase(),
    email_address: email.tolowerCase(),
    phone_number: phoneNumber,
    password: hashedPassword,
  });
  // return null;
  return funcSuccess(context, { user: user.toJSON() });
};

export default httpTrigger;
