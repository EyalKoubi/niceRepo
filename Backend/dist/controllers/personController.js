"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPersons = exports.deletep = exports.update = exports.create = exports.get = void 0;
const Models_1 = require("../Models");
// define function that get person
// details from his name
const get = async (personName, req, res) => {
    let person = await Models_1.Persons.findOne({
        first_name: personName[0],
        last_name: personName[1],
    });
    let result = "";
    if (!person)
        return res.send("The person doesn't exists!");
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
exports.get = get;
// define function that add new person
// to DB according to his details
const create = async (person, req, res) => {
    if (await Models_1.Persons.findOne({
        first_name: person.first_name,
        last_name: person.last_name,
    }))
        return res.send("Person with this name is already exists!");
    const new_user = await Models_1.Persons.create(person);
    return res.send("The person: " +
        new_user.first_name +
        " " +
        new_user.last_name +
        " added successfully!");
};
exports.create = create;
// define function that update
// the first name of specific person
const update = async (person, id, req, res) => {
    const new_person = await Models_1.Persons.findByIdAndUpdate(id, person, {
        new: true,
    });
    if (new_person)
        return res.send("Succeed updates");
    return res.send("The person doesn't exists");
};
exports.update = update;
// define function that
// delete specific person
async function deletep(id, res) {
    const person = await Models_1.Persons.findByIdAndDelete(id);
    if (person) {
        return res.send("The person: " +
            person.first_name +
            " " +
            person.last_name +
            " removed successfully!");
    }
    return res.send("not found");
}
exports.deletep = deletep;
async function getAllPersons(res) {
    const persons = await Models_1.Persons.find({});
    res.send(persons);
}
exports.getAllPersons = getAllPersons;
