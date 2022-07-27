import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { read } from "fs";
import * as uuid from "uuid";
import { func500Error } from "../src/utils";
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
  console.log("Test");
  Scenario.findAll({
    include: [{ model: Discription, required: false }],
  })
    .then((result) => {
      console.log("result", JSON.stringify(result, null, 2));
    })
    .catch((err) => {
      console.log("err", err);
    });

  // const result1 = result.map((id)=>id.toJSON())
  // const test = result1.forEach(async (data) => {
  //   const abc = await Discription.findByPk(data.description_id)
  //   const xyz = abc.toJSON()
  //   // console.log(xyz)
  //   return({
  //     description_id:`${xyz.pre} ${xyz.verb} ${xyz.first_line}`
  //   }
  //   )
  // });
  // console.log(result1);
};

const create = async (context: Context, req: HttpRequest) => {
  const { discriptionID, tags, sq1State, sq2State } = req.body;
  const result = await Scenario.create({
    id: uuid.v4(),
    description_id: discriptionID,
    sq1_state: sq1State,
    sq2_state: sq2State,
  });
  console.log(result);
};

export default httpTrigger;
