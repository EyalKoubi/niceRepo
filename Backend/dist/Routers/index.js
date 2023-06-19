"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common_router = exports.group_router = exports.person_router = void 0;
// imports
const personsRouter_1 = require("./personsRouter");
Object.defineProperty(exports, "person_router", { enumerable: true, get: function () { return personsRouter_1.person_router; } });
const groupsRouter_1 = require("./groupsRouter");
Object.defineProperty(exports, "group_router", { enumerable: true, get: function () { return groupsRouter_1.group_router; } });
const commonRouter_1 = require("./commonRouter");
Object.defineProperty(exports, "common_router", { enumerable: true, get: function () { return commonRouter_1.common_router; } });
