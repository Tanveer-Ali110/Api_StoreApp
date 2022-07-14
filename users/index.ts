import { AzureFunction, Context, HttpRequest } from "@azure/functions";
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
    console.log('err',err);
    func500Error(context);
  }
};

const get = async (context: Context, req: HttpRequest) => {
  console.log("get function call");

  return null
};

const create = async (context: Context, req: HttpRequest)=> {
  // if(!req.body.emailAddress) return funcValidationError(context, 'email address not set')
  console.log("post execute");
  const user = await User.create({
    id: 1,
    firstName: "abc",
    lastName: "qew",
    phoneNumber: 123456,
    password: "asdf",
    confirmPassword: "asdf",
  });
  console.log("user", user);
  return null
};

export default httpTrigger;
