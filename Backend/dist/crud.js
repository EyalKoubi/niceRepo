"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
const Models_1 = require("./Models");
const Routers_1 = require("./Routers");
const app = (0, express_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)());
// define function for connect
// to the Data Base
const connectToDb = async () => {
    try {
        await mongoose_1.default.connect("mongodb://127.0.0.1/myDB");
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("Error connecting to MongoDB:");
    }
};
exports.connectToDb = connectToDb;
// define function for using
// the routers of the application
const use = () => {
    app.use(express_1.default.json());
    app.use("/persons", Routers_1.person_router);
    app.use("/groups", Routers_1.group_router);
    app.use("/common", Routers_1.common_router);
};
// define function for create indexes
// for the relations and for aggretion
const indexes = () => {
    Models_1.Persons.collection.createIndex({ first_name: 1 });
    Models_1.Persons.collection.createIndex({ last_name: 1 });
    Models_1.Groups.collection.createIndex({ group_name: 1 });
};
// define main function
// for activate the app
const main = () => {
    (0, exports.connectToDb)();
    indexes();
    use();
    app.listen(config_1.PORT, () => console.log(`Server is now listening on port ${config_1.PORT}`));
};
// activate the app
main();
