const animal = require("./data/animals");
const connection = require("./mongoConnection");

async function main() {
    // await animal.create();

    const doggo = await animal.create();
    const rem = await animal.create("Lucy", "Dog");
    await animal.getAll();
    await animal.create("Duke", "Walrus");
    await animal.rename(String(doggo._id), "Sashita");
    await animal.remove(String(rem._id));
    await animal.getAll();


    const db = await connection();
    await db.serverConfig.close();
    // console.log("finished");
}


main().catch(function(error) {
    console.error(error);
});