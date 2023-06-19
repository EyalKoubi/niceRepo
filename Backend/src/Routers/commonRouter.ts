// imports
import express, { Request, Response } from "express";
import * as checks from "../validators/types_checks";
import * as commonCont from "../controllers/commonController";

// define common router
export const common_router = express.Router();

// define action that present the user the
// whole groups that the person is in them
common_router.get("/hisGroups", async (req: Request, res: Response) => {
  // validate
  if (!req.query.person_name)
    return res.status(400).json({ message: "Missing person_name parameter" });

  if (typeof req.query.person_name !== "string")
    return res.status(400).json({ message: "Wrong type of argument" });

  let personName = req.query.person_name.split(" ");

  await commonCont.his(personName, req, res);
});

// define action that search person in a group
// and return message that inform the user
// if the person is in the roup in some way
common_router.post(
  "/searchPersonInGroup",
  async (req: Request, res: Response) => {
    const search = req.body;

    // validate
    if (checks.searchSchema.validate(search) === undefined)
      return res.status(400).json({ message: "Wrong object" });

    let personName = search.person_name.split(" ");
    let groupName = search.group_name;

    await commonCont.searchPinG(personName, groupName, req, res);
  }
);

// define action that add person to group
common_router.post("/addPersonToGroup", async (req: Request, res: Response) => {
  const search = req.body;

  // validate
  if (checks.searchSchema.validate(search) === undefined)
    return res.status(400).json({ message: "Wrong object" });

  let personName = search.person_name.split(" ");
  let groupName = search.group_name;

  await commonCont.addPtoG(personName, groupName, res);
});

// define action that remove person from group
common_router.delete(
  "/removePersonFromGroup",
  async (req: Request, res: Response) => {
    const search = req.body;

    // validate
    if (checks.searchSchema.validate(search) === undefined)
      return res.status(400).json({ message: "Wrong object" });

    let personName = search.person_name.split(" ");
    let groupName = search.group_name;

    await commonCont.removePfromG(personName, groupName, req, res);
  }
);
