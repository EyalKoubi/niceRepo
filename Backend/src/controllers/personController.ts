// imports
import { CreateUserProps } from "src/types";
import { Persons } from "../Models";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

// define function that get person
// details from his name
export const get = async (
  personName: String[],
  req: Request,
  res: Response
) => {
  let person: any = await Persons.findOne({
    first_name: personName[0],
    last_name: personName[1],
  });

  let result = "";

  if (!person) return res.send("The person doesn't exists!");
  result +=
    "Person name: " +
    person.first_name +
    " " +
    person.last_name +
    "\nHis age is: " +
    person.age +
    "\n";
  return res.send(result);
};

// define function that add new person
// to DB according to his details
export const create = async (
  person: CreateUserProps,
  req: Request,
  res: Response
) => {
  if (
    await Persons.findOne({
      first_name: person.first_name,
      last_name: person.last_name,
    })
  )
    return res.send("Person with this name is already exists!");
  const new_user = await Persons.create(person);
  return res.send(
    "The person: " +
      new_user.first_name +
      " " +
      new_user.last_name +
      " added successfully!"
  );
};

// define function that update
// the first name of specific person
export const update = async (
  person: Object,
  id: String,
  req: Request,
  res: Response
) => {
  const new_person = await Persons.findByIdAndUpdate(id, person, {
    new: true,
  });
  if (new_person) return res.send("Succeed updates");
  return res.send("The person doesn't exists");
};

// define function that
// delete specific person
export async function deletep(id: ObjectId, res: Response) {
  const person = await Persons.findByIdAndDelete(id);

  if (person) {
    return res.send(
      "The person: " +
        person.first_name +
        " " +
        person.last_name +
        " removed successfully!"
    );
  }
  return res.send("not found");
}

export async function getAllPersons(res: Response) {
  const persons = await Persons.find({});
  res.send(persons);
}
