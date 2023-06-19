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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.group_router = void 0;
// imports
const express_1 = __importDefault(require("express"));
const Models_1 = require("../Models");
const helpers = __importStar(require("../helpers"));
const groupCont = __importStar(require("../controllers/groupController"));
const mongodb_1 = require("mongodb");
const checks = __importStar(require("../validators/types_checks"));
// define group router
exports.group_router = express_1.default.Router();
// define action that present
// the user a group
exports.group_router.get("/get", async (req, res) => {
    // validate
    if (!req.query.group_name)
        return res.status(400).json({ message: "Missing group_name parameter" });
    const groupName = req.query.group_name;
    await groupCont.get(groupName, req, res);
});
exports.group_router.get("/getSons/:group_name", async (req, res) => {
    if (!req.params.group_name)
        return res.status(400).json({ message: "Missing group_name parameter" });
    const groupName = req.params.group_name;
    return await groupCont.getSons(res, groupName);
});
exports.group_router.get("/getGroups", async (req, res) => {
    return await groupCont.getAllGroups(res);
});
// define action that present the user the whole
// contains hyrarchy of a specific group
exports.group_router.get("/hirarchy", async (req, res) => {
    // validate
    if (!req.query.group_name)
        return res.status(400).json({ message: "Missing group_name parameter" });
    let groupName = req.query.group_name;
    await groupCont.hyrar(groupName, req, res);
});
// define action that create group
exports.group_router.post("/create", async (req, res) => {
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
exports.group_router.post("/addGroupToGroup", async (req, res) => {
    const add = req.body;
    // validate
    if (checks.addSchema.validate(add) === undefined)
        return res.status(400).json({ message: "Wrong object" });
    let big_group = add.big_group;
    let small_group = add.small_group;
    await groupCont.add(big_group, small_group, req, res);
});
exports.group_router.patch("/rename/:id", async (req, res) => {
    // validate
    if (!req.params.id)
        return res.status(400).json({ message: "Missing id parameter" });
    if (!req.body.newName)
        return res.status(400).json({ message: "Missing name parameter" });
    const id = req.params.id;
    const newName = req.body.newName;
    await groupCont.rename(res, id, newName);
});
// define action that delete group
exports.group_router.delete("/delete/:id", async (req, res) => {
    // validate
    if (!req.params.id)
        return res.status(400).json({ message: "Missing id parameter" });
    let id_string = req.params.id;
    if (!helpers.isID(id_string))
        return res.send("In valid id");
    let ID = new mongodb_1.ObjectId(id_string);
    let group = await Models_1.Groups.findOne(ID);
    await groupCont.deleteg(group, req, res);
});
// define action that remove
// group from another group
exports.group_router.delete("/removeGroupFromGroup", async (req, res) => {
    const add = req.body;
    // validate
    if (checks.addSchema.validate(add) === undefined)
        return res.status(400).json({ message: "Wrong object" });
    let big_group = add.big_group;
    let small_group = add.small_group;
    await groupCont.removeg(big_group, small_group, req, res);
});
