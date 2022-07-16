import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { isEmpty } from "lodash";
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

  const discription = await Discription.create({
    description_pre: subject,
    description_verb: verb,
    description_first_line: firstLine,
    description_second_line: secondLine,
  });
  return funcSuccess(context, { discription: discription.toJSON() });
};

export default httpTrigger;
