const mongoCollections = require("./mongoCollections");
const animals = mongoCollections.animals;
const posts = require("./posts")
const { ObjectId } = require('mongodb');

async function create(name, animalType) {
    if (arguments.length !== 2) throw `Error: function create() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (name) !== "string") throw `Error: function create() expected name to be a string but instead recieved a ${typeof (name)}`;
    if (typeof (animalType) !== "string") throw `Error: function create() expected animalType to be a string but instead recieved a ${typeof (animalType)}`;

    const insert = {
        name: name,
        animalType: animalType,
        likes: [],
        posts: []
    }

    const animalCollection = await animals();
    const insertInfo = await animalCollection.insertOne(insert);

    if (insertInfo.insertedCount === 0) throw `Error: could not insert animal: ${name} into database`;

    return insert;
}

async function getAll() {
    if (arguments.length !== 0) throw `Error: function getAll() expected 0 parameters but instead received ${arguments.length}`;
    const animalCollection = await animals();
    const anis = await animalCollection.find({}).toArray();
    for (let i = 0; i < anis.length; i++) {
        const likes = anis[i].likes;
        for (let j = 0; j < likes.length; j++) {
            likes[j] = { _id: likes[j], title: await posts.getPostTitle(likes[j]) };
        }

        const ps = anis[i].posts;
        for (let j = 0; j < ps.length; j++) {
            ps[j] = { _id: ps[j], title: await posts.getPostTitle(ps[j]) };
        }
    }
    return anis;
}

async function get(id) {
    if (arguments.length !== 1) throw `Error: function get() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function get() expected id to be a string but instead recieved a ${typeof (id)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function get() received an invalid id: ${id}`;
    const animalCollection = await animals();
    const ani = await animalCollection.findOne({ _id: objId });

    if (ani === null) throw `Error: function get() could not find a animal with the id: ${id}`;

    const likes = ani.likes
    for (let j = 0; j < likes.length; j++) {
        likes[j] = { _id: likes[j], title: await posts.getPostTitle(likes[j]) };
    }

    const ps = ani.posts;
    for (let j = 0; j < ps.length; j++) {
        ps[j] = { _id: ps[j], title: await posts.getPostTitle(ps[j]) };
    }

    return ani;
}

async function remove(id) {
    if (arguments.length !== 1) throw `Error: function remove() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function remove() expected id to be a string but instead recieved a ${typeof (id)}`;

    const objId = ObjectId.createFromHexString(id);

    if (!ObjectId.isValid(objId)) throw `Error: function remove() received an invalid id: ${id}`;
    const animalCollection = await animals();

    const ani = await get(id);

    const ps = ani.posts;
    for (let j = 0; j < ps.length; j++) {
        await posts.removePost(ps[j]._id);
    }

    const deletionInfo = await animalCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) throw `Error: function remove() could not remove an animal with the id: ${id}`;

    return ani;
}

async function rename(id, newName) {
    if (arguments.length !== 2) throw `Error: function rename() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function rename() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (newName) !== 'string') throw `Error: function rename() expected newName to be a string but instead recieved a ${typeof (newName)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function rename() received an invalid id: ${id}`;
    const animalCollection = await animals();

    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw `Error: function rename() could not find an animal with the id: ${id}`;

    const updatedValues = {
        name: newName,
        animalType: ani.animalType
    }

    const updateInfo = await animalCollection.updateOne({ _id: objId }, { $set: updatedValues });
    if (updateInfo.modifiedCount === 0) throw `Error: function rename() could not rename an animal with the id: ${id}`;

    return updatedValues;
}

async function retype(id, newType) {
    if (arguments.length !== 2) throw `Error: function retype() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function retype() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (newType) !== 'string') throw `Error: function retype() expected newType to be a string but instead recieved a ${typeof (newType)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function retype() received an invalid id: ${id}`;
    const animalCollection = await animals();

    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw `Error: function retype() could not find an animal with the id: ${id}`;

    const updatedValues = {
        name: ani.name,
        animalType: newType
    }

    const updateInfo = await animalCollection.updateOne({ _id: objId }, { $set: updatedValues });
    if (updateInfo.modifiedCount === 0) throw `Error: function retype() could not change type of animal with the id: ${id}`;

    return updatedValues;
}

async function update(id, newName, newType) {
    if (arguments.length !== 3) throw `Error: function update() expected 3 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function update() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (newName) !== 'string') throw `Error: function update() expected newName to be a string but instead recieved a ${typeof (newName)}`;
    if (typeof (newType) !== 'string') throw `Error: function update() expected newType to be a string but instead recieved a ${typeof (newType)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function update() received an invalid id: ${id}`;
    const animalCollection = await animals();

    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw `Error: function update() could not find an animal with the id: ${id}`;

    const updatedValues = {
        name: newName,
        animalType: newType
    }

    const updateInfo = await animalCollection.updateOne({ _id: objId }, { $set: updatedValues });
    if (updateInfo.modifiedCount === 0) throw `Error: function update() could not update an animal with the id: ${id}`;

    return updatedValues;
}

async function addPost(id, postId) {
    if (arguments.length !== 2) throw `Error: function addPost() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function addPost() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (postId) !== 'string') throw `Error: function addPost() expected postId to be a string but instead recieved a ${typeof (postId)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function addPost() received an invalid id: ${id}`;
    if (!ObjectId.isValid(ObjectId.createFromHexString(postId))) throw `Error: function addPost() received an invalid postId: ${postId}`;

    const animalCollection = await animals();
    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw `Error: function addPost() could not find an animal with the id: ${id}`;

    return animalCollection.updateOne({ _id: objId }, { $addToSet: { posts: postId } }).then(async function () {
        return await animalCollection.findOne({ _id: objId });
    });
}

async function addLike(id, postId) {
    if (arguments.length !== 2) throw `Error: function addLike() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function addLike() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (postId) !== 'string') throw `Error: function addLike() expected postId to be a string but instead recieved a ${typeof (postId)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function addLike() received an invalid id: ${id}`;
    if (!ObjectId.isValid(ObjectId.createFromHexString(postId))) throw `Error: function addLike() received an invalid postId: ${postId}`;

    const animalCollection = await animals();
    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw `Error: function addLike() could not find an animal with the id: ${id}`;

    return animalCollection.updateOne({ _id: objId }, { $addToSet: { likes: postId } }).then(async function () {
        return await animalCollection.findOne({ _id: objId });
    });
}

async function removePost(id, postId) {
    if (arguments.length !== 2) throw `Error: function removePost() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function removePost() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (postId) !== 'string') throw `Error: function removePost() expected postId to be a string but instead recieved a ${typeof (postId)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function removePost() received an invalid id: ${id}`;
    if (!ObjectId.isValid(ObjectId.createFromHexString(postId))) throw `Error: function removePost() received an invalid postId: ${postId}`;

    const animalCollection = await animals();
    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw `Error: function removePost() could not find an animal with the id: ${id}`;

    return animalCollection.updateOne({ _id: objId }, { $pull: { posts: postId } }).then(async function () {
        return await animalCollection.findOne({ _id: objId });
    });
}

async function removeLike(id, postId) {
    if (arguments.length !== 2) throw `Error: function removeLike() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function removeLike() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (postId) !== 'string') throw `Error: function removeLike() expected postId to be a string but instead recieved a ${typeof (postId)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function removeLike() received an invalid id: ${id}`;
    if (!ObjectId.isValid(ObjectId.createFromHexString(postId))) throw `Error: function removeLike() received an invalid postId: ${postId}`;

    const animalCollection = await animals();
    const ani = await animalCollection.findOne({ _id: objId });
    if (ani === null) throw `Error: function removeLike() could not find an animal with the id: ${id}`;

    return animalCollection.updateOne({ _id: objId }, { $pull: { likes: postId } }).then(async function () {
        return await animalCollection.findOne({ _id: objId });
    });
}



module.exports = {
    create,
    getAll,
    get,
    remove,
    rename,
    retype,
    update,
    addPost,
    addLike,
    removePost,
    removeLike
};