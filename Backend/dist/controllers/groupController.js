"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSons = exports.rename = exports.getAllGroups = exports.marko = exports.removeg = exports.deleteg = exports.add = exports.create = exports.hyrar = exports.get = void 0;
// imports
const Models_1 = require("../Models");
const helpers = __importStar(require("../helpers"));
// define function that get group
// details from his name
async function get(group_name, req, res) {
    const group = await Models_1.Groups.findOne({ group_name });
    let result = "";
    if (!group)
        return res.send("The group doesn't exists!");
    result += "The Group: " + group.group_name + "\n";
    result += "It contains this groups:\n";
    for (let i = 0; i < group.groups_ids.length; i++) {
        let g = await Models_1.Groups.findById(group.groups_ids[i]);
        result += "Group number " + (i + 1) + ": " + g.group_name + "\n";
    }
    result += "And it contains this persons:\n";
    for (let i = 0; i < group.persons_ids.length; i++) {
        let p = await Models_1.Persons.findById(group.persons_ids[i]);
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
exports.get = get;
// define function that get group
// details and hirarchy from his name
async function hyrar(groupName, req, res) {
    let group = await Models_1.Groups.findOne({ group_name: groupName });
    if (!group)
        return res.send("The group doesn't exists!");
    const i = 1;
    let msg = await helpers.BFS([group], i);
    res.send(msg);
}
exports.hyrar = hyrar;
// define function that create new group
async function create(new_group, req, res) {
    if (await Models_1.Groups.findOne({ group_name: new_group.group_name }))
        return res.send("Group with that name is already exists!");
    await Models_1.Groups.insertMany([new_group]);
    return res.send("The group: " + new_group.group_name + " added successfully!");
}
exports.create = create;
// define function that add
// group into another group
async function add(big_group, small_group, req, res) {
    let first_group = await Models_1.Groups.findOne({ group_name: big_group });
    let second_group = await Models_1.Groups.findOne({ group_name: small_group });
    if (!first_group)
        return res.send("The big group doesn't exists!");
    if (!second_group)
        return res.send("The small group doesn't exists!");
    if (second_group.have_father)
        return res.send("Group not have more than one father!");
    if (first_group._id.equals(second_group._id))
        return res.send("Group can not contain itself - Rassel Parradox!");
    if (await helpers.DFS(second_group, first_group._id))
        return res.send("Circles in the group graph aren't allowed!");
    await Models_1.Groups.updateOne({ _id: first_group._id }, { $addToSet: { groups_ids: second_group._id } });
    await Models_1.Groups.findOneAndUpdate({ _id: second_group._id }, { have_father: true }, { new: true });
    return res.send("The Group: " +
        second_group.group_name +
        " add to: " +
        first_group.group_name +
        " successfully!");
}
exports.add = add;
// define function that delete group
async function deleteg(group, req, res) {
    if (group === null)
        return res.send("The group doesn't exists!");
    for (let i = 0; i < group.persons_ids.length; i++)
        await Models_1.Persons.updateOne({ _id: group.persons_ids[i] }, { $pull: { belongs_to: group._id } });
    for (let i = 0; i < group.groups_ids.length; i++) {
        let son = await Models_1.Groups.findOne(group.groups_ids[i]);
        marko(son);
        await Models_1.Groups.findOneAndDelete(group.groups_ids[i]);
    }
    await Models_1.Groups.findOneAndDelete(group._id);
    return res.send("The group: " + group.group_name + " removed successfully!");
}
exports.deleteg = deleteg;
// define function that remove group from another group
async function removeg(big_group, small_group, req, res) {
    let first_group = await Models_1.Groups.findOne({ group_name: big_group });
    let second_group = await Models_1.Groups.findOne({ group_name: small_group });
    if (!first_group.length)
        return res.send("The big group doesn't exists!");
    if (!second_group.length)
        return res.send("The small group doesn't exists!");
    if (!first_group[0].groups_ids.includes(second_group[0]._id))
        return res.send("The big group doesn't includes the small group!");
    await Models_1.Groups.updateOne({ _id: first_group[0]._id }, { $pull: { groups_ids: second_group[0]._id } });
    await Models_1.Groups.updateOne({ _id: second_group[0]._id }, { have_father: false });
    return res.send("Group: " +
        small_group +
        " removed from group: " +
        big_group +
        " successfully!");
}
exports.removeg = removeg;
// define function that make 'have_father'
// to false for each sons groups of the
// group that we want to delete
async function marko(son) {
    for (let i = 0; i < son.groups_ids.length; i++)
        await Models_1.Groups.updateOne({ _id: son.groups_ids[i] }, { have_father: false });
}
exports.marko = marko;
const getAllGroups = async (res) => {
    const groups = await Models_1.Groups.find({});
    res.send(groups);
};
exports.getAllGroups = getAllGroups;
const rename = async (res, id, newName) => {
    const all_groups = await Models_1.Groups.find({});
    for (let i = 0; i < all_groups.length; i++) {
        if (newName === all_groups[i].group_name)
            return res.send("Group with that name already exists!");
    }
    await Models_1.Groups.updateOne({ _id: id }, { group_name: newName });
    return res.send("Update succeed!");
};
exports.rename = rename;
const getSons = async (res, groupName) => {
    const our_group = await Models_1.Groups.find({ group_name: groupName });
    let sons = [];
    for (let i = 0; i < our_group[0].groups_ids.length; i++) {
        let son = await Models_1.Groups.findById(our_group[0].groups_ids[i]);
        sons.push({
            _id: son === null || son === void 0 ? void 0 : son._id,
            group_name: son === null || son === void 0 ? void 0 : son.group_name,
        });
    }
    return res.send(sons);
};
exports.getSons = getSons;
