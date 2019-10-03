const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
const { ObjectId } = require('mongodb');

async function getTask(id) {
    if(arguments.length !== 1) throw "Error: incorrect number of arguments for getTask()";
    if (typeof(id) !== 'string') throw "Error: id must be given in string format";

    const objId = ObjectId.createFromHexString(id);
    const todoCollection = await todoItems();
    const item = await todoCollection.findOne({ _id: objId });
    if (item === null) throw "Error: no task with that id";

    return item;
}

async function getAllTasks() {
    if(arguments.length !== 0) throw "Error: incorrect number of arguments for getAllTasks()";
    const todoCollection = await todoItems();
    const todo = await todoCollection.find({}).toArray();
    return todo;
}

async function completeTask(taskId) {
    if(arguments.length !== 1) throw "Error: incorrect number of arguments for completeTask()";
    if(typeof(taskId) !== 'string') throw "Error: taskId should be an string"

    const objId = ObjectId.createFromHexString(taskId);
    const todoCollection = await todoItems();

    const item = await todoCollection.findOne({ _id: objId });
    if (item === null) throw "Error: no task with that id";

    const updatedValues = { $set: { completed: true, completedAt: new Date() } };
    const updateInfo = await todoCollection.updateOne({ _id: objId }, updatedValues, false);
    if (updateInfo.modifiedCount === 0) throw "Error: could not update task successfully";

    const update = await todoCollection.findOne({ _id: objId });
    return update;
}

async function removeTask(id) {
    if(arguments.length !== 1) throw "Error: incorrect number of arguments for removeTask()";
    if (typeof(id) !== 'string') throw "Error: id must be given in string format";

    const objId = ObjectId.createFromHexString(id);
    const todoCollection = await todoItems();
    const deletionInfo = await todoCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) {
      throw `Error: could not delete task with id of ${id}`;
    }

    return true;
  }

async function createTask(title, description) {
    if(arguments.length !== 2) throw "Error: expected 2 arguments for createTask()";
    if(typeof(title) !== "string") throw "Error: title must be a string";
    if(typeof(description) !== "string") throw "Error: description must be a string";

    const insert = {
        title: title,
        description: description,
        completed: false,
        completedAt: null
    }

    const todoCollection = await todoItems();
    const insertInfo = await todoCollection.insertOne(insert);

    if (insertInfo.insertedCount === 0) throw "Error: could not add task";

    return insert;
}

module.exports = {
    createTask,
    getAllTasks,
    getTask,
    completeTask,
    removeTask
}