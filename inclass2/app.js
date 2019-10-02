const todoItems = require("./todo");
const connection = require("./mongoConnection");

async function main() {
    try {
        const createdTask = await todoItems.createTask("My First Task", "This is the first thing I need to do today");
        console.log(createdTask);
    } catch (error) {
        console.log(error);
    }

    try {
        const createdTask = await todoItems.getTodos();
        console.log(createdTask);
    } catch (error) {
        console.log(error);
    }

    try {
        const createdTask = await todoItems.getTask("5d93e89119acd82c7e97e39a");
        console.log(createdTask);
    } catch (error) {
        console.log(error);
    }

    try {
        const task = await todoItems.getTask("5d93e89119acd82c7e97e39a");
        const finishedTask = await todoItems.completeTask(task._id); 
        console.log(finishedTask);
    } catch (error) {
        console.log(error);
    }
    

    const db = await connection();
    await db.serverConfig.close();
    console.log("finished");
}

main();