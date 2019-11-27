const mongoCollections = require("../mongoCollections");
const animals = mongoCollections.animals;
const { ObjectId } = require('mongodb');

async function create(name, animalType) {
    if (arguments.length !== 2) throw new Error(`function create() expected 2 parameters but instead received ${arguments.length}`);
    if (typeof (name) !== "string") throw new Error("name is expected to be a string");
    if (typeof (animalType) !== "string") throw new Error("animalType is expected to be a string")

    const insert = {
        name: name,
        animalType: animalType,
    }

    const animalCollection = await animals();
    const insertInfo = await animalCollection.insertOne(insert);

    if (insertInfo.insertedCount === 0) throw new Error("could not insert animal into database");

    return insert;
}

async function getAll() {
    if (arguments.length !== 0) throw new Error(`function getAll() expected 0 parameters but instead received ${arguments.length}`);
    const animalCollection = await animals();
    const anis = await animalCollection.find({}).toArray();
    return anis;
}

async function get(id) {
    if (arguments.length !== 1) throw new Error(`function get() expected 1 parameters but instead received ${arguments.length}`);
    if (typeof (id) !== 'string') throw new Error("id must be given in string format in function get()");

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw new Error(`invalid given id: ${id} in function get()`);
    const animalCollection = await animals();
    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw new Error(`no animal with given id: ${id} in function get()`);

    return ani;
}

async function remove(id) {
    if (arguments.length !== 1) throw new Error(`function remove() expected 1 parameters but instead received ${arguments.length}`);
    if (typeof (id) !== 'string') throw new Error("id must be given in string format in function remove()");

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw new Error(`invalid given id: ${id} in function remove()`);
    const animalCollection = await animals();

    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw new Error(`no animal with given id: ${id} in function remove()`);

    const deletionInfo = await animalCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) throw new Error(`could not remove animal sucessfully`);

    return ani;
}

async function rename(id, newName) {
    if (arguments.length !== 2) throw new Error(`function rename() expected 2 parameters but instead received ${arguments.length}`);
    if (typeof (id) !== 'string') throw new Error("id must be given in string format in function rename()");

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw new Error(`invalid given id: ${id} in function rename()`);
    const animalCollection = await animals();

    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw new Error(`no animal with given id: ${id} in function rename()`);

    const updatedValues = {
        name: newName,
        animalType: ani.animalType
    }
    const updateInfo = await animalCollection.updateOne({ _id: objId }, { $set: updatedValues });
    if (updateInfo.modifiedCount === 0) throw new Error("could not rename animal sucessfully");

    return updatedValues;
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
};