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
exports.common_router = void 0;
// imports
const express_1 = __importDefault(require("express"));
const checks = __importStar(require("../validators/types_checks"));
const commonCont = __importStar(require("../controllers/commonController"));
// define common router
exports.common_router = express_1.default.Router();
// define action that present the user the
// whole groups that the person is in them
exports.common_router.get("/hisGroups", async (req, res) => {
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
exports.common_router.post("/searchPersonInGroup", async (req, res) => {
    const search = req.body;
    // validate
    if (checks.searchSchema.validate(search) === undefined)
        return res.status(400).json({ message: "Wrong object" });
    let personName = search.person_name.split(" ");
    let groupName = search.group_name;
    await commonCont.searchPinG(personName, groupName, req, res);
});
// define action that add person to group
exports.common_router.post("/addPersonToGroup", async (req, res) => {
    const search = req.body;
    // validate
    if (checks.searchSchema.validate(search) === undefined)
        return res.status(400).json({ message: "Wrong object" });
    let personName = search.person_name.split(" ");
    let groupName = search.group_name;
    await commonCont.addPtoG(personName, groupName, res);
});
// define action that remove person from group
exports.common_router.delete("/removePersonFromGroup", async (req, res) => {
    const search = req.body;
    // validate
    if (checks.searchSchema.validate(search) === undefined)
        return res.status(400).json({ message: "Wrong object" });
    let personName = search.person_name.split(" ");
    let groupName = search.group_name;
    await commonCont.removePfromG(personName, groupName, req, res);
});
