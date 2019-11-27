const connection = require("./data/mongoConnection");
const data = require('./data');
const animalData = data.animals;
const postData = data.posts;


async function main() {
    const ani = await animalData.create("Morty", "Penguin");
    const post = await postData.addPost("test", String(ani._id), "This a test");
    const post2 = await postData.addPost("test2", String(ani._id), "This a test2");
    await animalData.addPost(String(ani._id), String(post._id));
    await animalData.addPost(String(ani._id), String(post2._id));
    console.log(await postData.getAllPosts());
    console.log(await animalData.get(String(ani._id)));
    console.log(await postData.getPostById(String(post._id)));
    console.log()
    console.log(await animalData.remove(String(ani._id)));
}

main().catch(function (error) {
    console.error(error);
}).then(async function () {
    const db = await connection();
    await db.serverConfig.close();
});