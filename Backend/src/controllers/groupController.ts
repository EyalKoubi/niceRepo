// imports
import { Persons, Groups } from "../Models";
import { Request, Response } from "express";
import * as helpers from "../helpers";

// define function that get group
// details from his name
export async function get(group_name: any, req: Request, res: Response) {
  const group = await Groups.findOne({ group_name });

  let result: string = "";

  if (!group) return res.send("The group doesn't exists!");
  result += "The Group: " + group.group_name + "\n";
  result += "It contains this groups:\n";
  for (let i = 0; i < group.groups_ids.length; i++) {
    let g: any = await Groups.findById(group.groups_ids[i]);
    result += "Group number " + (i + 1) + ": " + g.group_name + "\n";
  }
  result += "And it contains this persons:\n";
  for (let i = 0; i < group.persons_ids.length; i++) {
    let p: any = await Persons.findById(group.persons_ids[i]);
    result +=
      "Person number " +
      (i + 1) +
      ": " +
      p.first_name +
      " " +
      p.last_name +
      "\n";
  }
  return res.send(result);
}

// define function that get group
// details and hirarchy from his name
export async function hyrar(groupName: any, req: Request, res: Response) {
  let group = await Groups.findOne({ group_name: groupName });

  if (!group) return res.send("The group doesn't exists!");

  const i: number = 1;

  let msg = await helpers.BFS([group], i);

  res.send(msg);
}

// define function that create new group
export async function create(
  new_group: {
    group_name: any;
    persons_ids: never[];
    groups_ids: never[];
    have_father: boolean;
  },
  req: Request,
  res: Response
) {
  if (await Groups.findOne({ group_name: new_group.group_name }))
    return res.send("Group with that name is already exists!");
  await Groups.insertMany([new_group]);
  return res.send(
    "The group: " + new_group.group_name + " added successfully!"
  );
}

// define function that add
// group into another group
export async function add(
  big_group: any,
  small_group: any,
  req: Request,
  res: Response
) {
  let first_group: any = await Groups.findOne({ group_name: big_group });
  let second_group: any = await Groups.findOne({ group_name: small_group });

  if (!first_group) return res.send("The big group doesn't exists!");
  if (!second_group) return res.send("The small group doesn't exists!");
  if (second_group.have_father)
    return res.send("Group not have more than one father!");
  if (first_group._id.equals(second_group._id))
    return res.send("Group can not contain itself - Rassel Parradox!");
  if (await helpers.DFS(second_group, first_group._id))
    return res.send("Circles in the group graph aren't allowed!");
  await Groups.updateOne(
    { _id: first_group._id },
    { $addToSet: { groups_ids: second_group._id } }
  );
  await Groups.findOneAndUpdate(
    { _id: second_group._id },
    { have_father: true },
    { new: true }
  );
  return res.send(
    "The Group: " +
      second_group.group_name +
      " add to: " +
      first_group.group_name +
      " successfully!"
  );
}

// define function that delete group
export async function deleteg(group: any, req: Request, res: Response) {
  if (group === null) return res.send("The group doesn't exists!");

  for (let i = 0; i < group.persons_ids.length; i++)
    await Persons.updateOne(
      { _id: group.persons_ids[i] },
      { $pull: { belongs_to: group._id } }
    );

  for (let i = 0; i < group.groups_ids.length; i++) {
    let son = await Groups.findOne(group.groups_ids[i]);
    marko(son);
    await Groups.findOneAndDelete(group.groups_ids[i]);
  }

  await Groups.findOneAndDelete(group._id);

  return res.send("The group: " + group.group_name + " removed successfully!");
}

// define function that remove group from another group
export async function removeg(
  big_group: any,
  small_group: any,
  req: Request,
  res: Response
) {
  let first_group: any = await Groups.findOne({ group_name: big_group });
  let second_group: any = await Groups.findOne({ group_name: small_group });

  if (!first_group.length) return res.send("The big group doesn't exists!");
  if (!second_group.length) return res.send("The small group doesn't exists!");
  if (!first_group[0].groups_ids.includes(second_group[0]._id))
    return res.send("The big group doesn't includes the small group!");
  await Groups.updateOne(
    { _id: first_group[0]._id },
    { $pull: { groups_ids: second_group[0]._id } }
  );
  await Groups.updateOne({ _id: second_group[0]._id }, { have_father: false });
  return res.send(
    "Group: " +
      small_group +
      " removed from group: " +
      big_group +
      " successfully!"
  );
}

// define function that make 'have_father'
// to false for each sons groups of the
// group that we want to delete
export async function marko(son: any) {
  for (let i = 0; i < son.groups_ids.length; i++)
    await Groups.updateOne({ _id: son.groups_ids[i] }, { have_father: false });
}

export const getAllGroups = async (res: any) => {
  const groups = await Groups.find({});
  res.send(groups);
};

export const rename = async (
  res: Response<any, Record<string, any>>,
  id: string,
  newName: string
) => {
  const all_groups = await Groups.find({});
  for (let i = 0; i < all_groups.length; i++) {
    if (newName === all_groups[i].group_name)
      return res.send("Group with that name already exists!");
  }
  await Groups.updateOne({ _id: id }, { group_name: newName });
  return res.send("Update succeed!");
};

export const getSons = async (
  res: Response<any, Record<string, any>>,
  groupName: string
) => {
  const our_group = await Groups.find({ group_name: groupName });
  let sons = [];
  for (let i = 0; i < our_group[0].groups_ids.length; i++) {
    let son = await Groups.findById(our_group[0].groups_ids[i]);
    sons.push({
      _id: son?._id,
      group_name: son?.group_name,
    });
  }
  return res.send(sons);
};
