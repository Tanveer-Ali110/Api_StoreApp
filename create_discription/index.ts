import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { isEmpty } from "lodash";
import * as uuid from "uuid";
import { Discription } from "../storage/models";
import { initSequelize } from "../storage/tables";
import { func500Error, funcSuccess, funcValidationError } from "../src/utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await initSequelize();

    if (req.method === "POST") await create(context, req);
  } catch (err) {
    func500Error(context);
  }
};

const create = async (context: Context, req: HttpRequest) => {
  const { subject, verb, firstLine, secondLine } = req.body;

  if (isEmpty(subject))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(verb))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(firstLine))
    return funcValidationError(context, "required fills are invalid");
  if (isEmpty(secondLine))
    return funcValidationError(context, "required fills are invalid");

  const result = await Discription.create({
    id: uuid.v4(),
    pre: subject.toLowerCase(),
    verb: verb.toLowerCase(),
    first_line: firstLine.toLowerCase(),
    second_line: secondLine.toLowerCase(),
  });
  const discription = toString(result);
  console.log("discription", discription);
  return funcSuccess(context, { discription: discription });
};

const toString = (object: any) => {
  let data: any = {};
  let temp = object.dataValues;
  const abc = [temp.pre, temp.verb, temp.first_line, temp.second_line];
  let discription = abc.join(" ");
  data.id = temp.id;
  data.discription = discription;

  return data;
};
export default httpTrigger;
