import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { isEmpty } from "lodash";
import * as uuid from "uuid";
import { Discription } from "../storage/models";
import { initSequelize } from "../storage/tables";
import { func500Error, funcSuccess, funcValidationError } from "../src/utils";
import validateJWTUserSign from "../src/utils/validates";
import { Op, Sequelize } from "sequelize";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    await initSequelize();

    if (req.method === "GET") await get(context, req);
    else if (req.method === "POST") await create(context, req);
  } catch (err) {
    func500Error(context);
  }
};

const get = async (context: Context, req: HttpRequest) => {
  const result = await Discription.findAll({ order: [["createdAt", "DESC"]] });

  return funcSuccess(context, {
    discription: result.map((data) => data.toJSON()),
  });
};

const create = async (context: Context, req: HttpRequest) => {
  if (context?.bindingData?.action === "search") {
    console.log("abc", context?.bindingData?.action, req.body.input);
    const result = await Discription.findAll({
      where: {
        [Op.or]: [
          {
            pre: { [Op.like]: "%" + req.body.input + "%" },
          },
          {
            verb: { [Op.like]: `%${req.body.input}%` },
          },
          {
            first_line: { [Op.like]: `%${req.body.input}%` },
          },
          {
            second_line: { [Op.like]: `%${req.body.input}%` },
          },
          Sequelize.where(
            Sequelize.fn(
              "concat",
              Sequelize.col("pre"),
              Sequelize.col("verb"),
              Sequelize.col("first_line"),
              " ",
              Sequelize.col("second_line")
            ),
            {
              [Op.like]: `%${req.body.input}%`,
            }
          ),
        ],
      },
      order: [["createdAt", "DESC"]],
    });
    return funcSuccess(context, {
      discription: result.map((data) => data.toJSON()),
    });
  }
  const userPayload = await validateJWTUserSign(context, req); // check if wallet is signed in
  if (!userPayload || !userPayload?.username) return userPayload;

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
  return funcSuccess(context, { discription: result.toJSON() });
};

export default httpTrigger;
