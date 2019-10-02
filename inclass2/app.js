const todoItems = require("./todo");
const connection = require("./mongoConnection");

async function main() {
    try {
        const createdTask = await todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
        console.log(createdTask);
        const id1 = String(createdTask['_id']);
        const secondTask = await todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
        const id2 = String(secondTask['_id']);
        console.log();
        console.log(await todoItems.getAllTasks());
        console.log();
        await todoItems.removeTask(id1);
        console.log(await todoItems.getAllTasks());
        console.log();
        console.log(await todoItems.completeTask(id2));
    } catch (error) {
        console.log(error);
    }

    const db = await connection();
    await db.serverConfig.close();
    console.log("finished");
}

main();