// imports
import express, { Request, Response } from "express";
import * as helpers from "../helpers";
import * as checks from "../validators/types_checks";
import * as personCont from "../controllers/personController";
import { ObjectId } from "mongodb";

// define person router
export const person_router = express.Router();

// define action that present
// the user a person
person_router.get("/get", async (req: Request, res: Response) => {
  // validate
  if (!req.query.person_name)
    return res.status(400).json({ message: "Missing person_name parameter" });

  if (typeof req.query.person_name !== "string")
    return res.status(400).json({ message: "Wrong type of argument" });

  const personName = req.query.person_name.split(" ");

  await personCont.get(personName, req, res);
});

person_router.get("/getPersons", async (req: Request, res: Response) => {
  await personCont.getAllPersons(res);
});

// define action that create group
person_router.post("/create", async (req: Request, res: Response) => {
  const person = req.body;

  // validate
  const { error } = checks.perSchema.validate(person);
  if (error) return res.status(400).json({ message: error.message });

  await personCont.create(person, req, res);
});

// define action that update person
person_router.put("/update/:id", async (req: Request, res: Response) => {
  const ID = req.params.id;

  const update = req.body;

  // validate
  const { error } = checks.updateSchema.validate(update);
  if (error) return res.status(400).json({ message: error.message });

  await personCont.update(update, ID, req, res);
});

// define action that delete person
person_router.delete("/delete/:id", async (req: Request, res: Response) => {
  // validate
  // if (!req.params.id)
  //   return res.status(400).json({ message: "Missing id parameter" });

  const id_string = req.params.id;

  if (!helpers.isID(id_string)) return res.send("In valid id");

  const ID = new ObjectId(id_string);

  await personCont.deletep(ID, res);
});
