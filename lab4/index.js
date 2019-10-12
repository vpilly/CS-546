const animal = require("./data/animals");
const connection = require("./mongoConnection");

async function main() {
    // await animal.create();

    const doggo = await animal.create("Sasha", "Dog");
    console.log(doggo);
    const rem = await animal.create("Lucy", "Dog");
    // console.log();
    console.log(await animal.getAll());
    // console.log();
    console.log(await animal.create("Duke", "Walrus"));
    // console.log();
    console.log(await animal.rename(String(doggo._id), "Sashita"));
    // console.log();
    await animal.remove(String(rem._id));
    console.log(await animal.getAll())


    const db = await connection();
    await db.serverConfig.close();
    // console.log("finished");
}


main().catch(function(error) {
    console.error(error);
});