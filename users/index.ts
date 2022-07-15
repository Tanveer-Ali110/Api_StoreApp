import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as uuid from "uuid";
import * as bcrypt from "bcrypt";
import User from "../src/models/user.model";
import { initSequelize } from "../src/storage";
import { func500Error, funcValidationError } from "../src/utils";

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  try {
    await initSequelize();
    if (req.method === "GET") await get(context, req);
    else if (req.method === "POST") await create(context, req);
  } catch (err) {
    console.log("err", err);
    func500Error(context);
  }
};

const get = async (context: Context, req: HttpRequest) => {
  console.log("get function call");
  return null;
};

const create = async (context: Context, req: HttpRequest) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  // if(!req.body.emailAddress) return funcValidationError(context, 'email address not set')
  console.log("post execute");
  let saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    id: uuid.v4(),
    username: `${firstName} ${lastName}`,
    first_name: firstName,
    last_name: lastName,
    email_address: email,
    phone_number: phoneNumber,
    password: hashedPassword,
  });
  console.log("user", user);
  return null;
};

export default httpTrigger;
