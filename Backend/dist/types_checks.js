"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSchema = exports.addSchema = exports.updateSchema = exports.perSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Schema for person details
exports.perSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    age: joi_1.default.number().integer().min(0).required()
});
// Schema for updating person name
exports.updateSchema = joi_1.default.object({
    person_name: joi_1.default.string().required(),
    after: joi_1.default.string().required(),
});
// Schema for adding group
exports.addSchema = joi_1.default.object({
    big_group: joi_1.default.string().required(),
    small_group: joi_1.default.string().required(),
});
// Schema for searching by person name and group name
exports.searchSchema = joi_1.default.object({
    person_name: joi_1.default.string().required(),
    group_name: joi_1.default.string().required(),
});
