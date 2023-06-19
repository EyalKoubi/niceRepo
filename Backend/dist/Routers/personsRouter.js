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
exports.person_router = void 0;
// imports
const express_1 = __importDefault(require("express"));
const helpers = __importStar(require("../helpers"));
const checks = __importStar(require("../validators/types_checks"));
const personCont = __importStar(require("../controllers/personController"));
const mongodb_1 = require("mongodb");
// define person router
exports.person_router = express_1.default.Router();
// define action that present
// the user a person
exports.person_router.get("/get", async (req, res) => {
    // validate
    if (!req.query.person_name)
        return res.status(400).json({ message: "Missing person_name parameter" });
    if (typeof req.query.person_name !== "string")
        return res.status(400).json({ message: "Wrong type of argument" });
    const personName = req.query.person_name.split(" ");
    await personCont.get(personName, req, res);
});
exports.person_router.get("/getPersons", async (req, res) => {
    await personCont.getAllPersons(res);
});
// define action that create group
exports.person_router.post("/create", async (req, res) => {
    const person = req.body;
    // validate
    const { error } = checks.perSchema.validate(person);
    if (error)
        return res.status(400).json({ message: error.message });
    await personCont.create(person, req, res);
});
// define action that update person
exports.person_router.put("/update/:id", async (req, res) => {
    const ID = req.params.id;
    const update = req.body;
    // validate
    const { error } = checks.updateSchema.validate(update);
    if (error)
        return res.status(400).json({ message: error.message });
    await personCont.update(update, ID, req, res);
});
// define action that delete person
exports.person_router.delete("/delete/:id", async (req, res) => {
    // validate
    // if (!req.params.id)
    //   return res.status(400).json({ message: "Missing id parameter" });
    const id_string = req.params.id;
    if (!helpers.isID(id_string))
        return res.send("In valid id");
    const ID = new mongodb_1.ObjectId(id_string);
    await personCont.deletep(ID, res);
});
