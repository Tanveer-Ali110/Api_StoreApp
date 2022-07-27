import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { read } from "fs";
import * as uuid from "uuid";
import { func500Error, funcSuccess } from "../src/utils";
import { Discription, Scenario } from "../storage/models";
import { initSequelize } from "../storage/tables";

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
  const result = await Scenario.findAll({
    include: [{ model: Discription, required: false }],
  });

  return funcSuccess(context, {
    scenario: result.map((s) => s.toJSON()),
  });
};

const create = async (context: Context, req: HttpRequest) => {
  const { discriptionID, tags, sq1State, sq2State } = req.body;
  const result = await Scenario.create({
    id: uuid.v4(),
    description_id: discriptionID,
    sq1_state: sq1State,
    sq2_state: sq2State,
  });
  console.log(JSON.stringify(result));
};

export default httpTrigger;
