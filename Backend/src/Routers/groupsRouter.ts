// imports
import express, { Request, Response } from "express";
import { Groups } from "../Models";
import * as helpers from "../helpers";
import * as groupCont from "../controllers/groupController";
import { ObjectId } from "mongodb";
import * as checks from "../validators/types_checks";

// define group router
export const group_router = express.Router();

// define action that present
// the user a group
group_router.get("/get", async (req: Request, res: Response) => {
  // validate
  if (!req.query.group_name)
    return res.status(400).json({ message: "Missing group_name parameter" });

  const groupName = req.query.group_name;

  await groupCont.get(groupName, req, res);
});

group_router.get(
  "/getSons/:group_name",
  async (req: Request, res: Response) => {
    if (!req.params.group_name)
      return res.status(400).json({ message: "Missing group_name parameter" });
    const groupName = req.params.group_name;
    return await groupCont.getSons(res, groupName);
  }
);

group_router.get("/getGroups", async (req, res) => {
  return await groupCont.getAllGroups(res);
});

// define action that present the user the whole
// contains hyrarchy of a specific group
group_router.get("/hirarchy", async (req: Request, res: Response) => {
  // validate
  if (!req.query.group_name)
    return res.status(400).json({ message: "Missing group_name parameter" });

  let groupName = req.query.group_name;

  await groupCont.hyrar(groupName, req, res);
});

// define action that create group
group_router.post("/create", async (req: Request, res: Response) => {
  // validate
  if (!req.query.group_name)
    return res.status(400).json({ message: "Missing group_name parameter" });

  let groupName = req.query.group_name;

  const new_group = {
    group_name: groupName,
    persons_ids: [],
    groups_ids: [],
    have_father: false,
  };

  await groupCont.create(new_group, req, res);
});

// define action that add group to other group
group_router.post("/addGroupToGroup", async (req: Request, res: Response) => {
  const add = req.body;

  // validate
  if (checks.addSchema.validate(add) === undefined)
    return res.status(400).json({ message: "Wrong object" });

  let big_group = add.big_group;
  let small_group = add.small_group;

  await groupCont.add(big_group, small_group, req, res);
});

group_router.patch("/rename/:id", async (req: Request, res: Response) => {
  // validate
  if (!req.params.id)
    return res.status(400).json({ message: "Missing id parameter" });
  if (!req.body.newName)
    return res.status(400).json({ message: "Missing name parameter" });
  const id: string = req.params.id;
  const newName: string = req.body.newName;
  await groupCont.rename(res, id, newName);
});

// define action that delete group
group_router.delete("/delete/:id", async (req: Request, res: Response) => {
  // validate
  if (!req.params.id)
    return res.status(400).json({ message: "Missing id parameter" });

  let id_string = req.params.id;

  if (!helpers.isID(id_string)) return res.send("In valid id");

  let ID = new ObjectId(id_string);

  let group: any = await Groups.findOne(ID);

  await groupCont.deleteg(group, req, res);
});

// define action that remove
// group from another group
group_router.delete(
  "/removeGroupFromGroup",
  async (req: Request, res: Response) => {
    const add = req.body;

    // validate
    if (checks.addSchema.validate(add) === undefined)
      return res.status(400).json({ message: "Wrong object" });

    let big_group = add.big_group;
    let small_group = add.small_group;

    await groupCont.removeg(big_group, small_group, req, res);
  }
);
