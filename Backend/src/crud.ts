import { PORT } from "./config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import the cors middleware
import { Persons, Groups } from "./Models";
import { person_router, group_router, common_router } from "./Routers";

const app = express();

// Enable CORS for all routes
app.use(cors());

// define function for connect
// to the Data Base
export const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/myDB");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:");
  }
};

// define function for using
// the routers of the application
const use = () => {
  app.use(express.json());
  app.use("/persons", person_router);
  app.use("/groups", group_router);
  app.use("/common", common_router);
};

// define function for create indexes
// for the relations and for aggretion
const indexes = () => {
  Persons.collection.createIndex({ first_name: 1 });
  Persons.collection.createIndex({ last_name: 1 });
  Groups.collection.createIndex({ group_name: 1 });
};

// define main function
// for activate the app
const main = () => {
  connectToDb();
  indexes();
  use();

  app.listen(PORT, () =>
    console.log(`Server is now listening on port ${PORT}`)
  );
};

// activate the app
main();
