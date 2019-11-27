const mongoCollections = require('./mongoCollections');
const posts = mongoCollections.posts;
const animals = mongoCollections.animals;
const { ObjectId } = require('mongodb');

async function getAnimalName(id) {
    if (arguments.length !== 1) throw `Error: function getAnimalName() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function getAnimalName() expected id to be a string but instead recieved a ${typeof (id)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function getAnimalName() received an invalid id: ${id}`;
    const animalCollection = await animals();
    const ani = await animalCollection.findOne({ _id: objId });

    if (ani === null) throw `Error: function getAnimalName() could not find a animal with the id: ${id}`;

    return ani.name;
}

async function getPostTitle(id) {
    if (arguments.length !== 1) throw `Error: function getPostTitle() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function getPostTitle() expected id to be a string but instead recieved a ${typeof (id)}`;


    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function getPostTitle() received an invalid id: ${id}`;

    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: objId });

    if (post === null) throw `Error: function getPostTitle() could not find a post with the id: ${id}`;

    return post.title;

}

async function getAllPosts() {
    if (arguments.length !== 0) throw `Error: function getAllPosts() expected 0 parameters but instead received ${arguments.length}`;

    const postCollection = await posts();
    const ps = await postCollection.find({}).toArray();
    for (let i = 0; i < ps.length; i++) {
        ps[i].author = { _id: ps[i].author, name: await getAnimalName(ps[i].author) };
    }
    return ps;
}

async function getPostById(id) {
    if (arguments.length !== 1) throw `Error: function getPostById() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function getPostById() expected id to be a string but instead recieved a ${typeof (id)}`;


    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function getPostById() received an invalid id: ${id}`;

    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: objId });

    if (post === null) throw `Error: function getPostById() could not find a post with the id: ${id}`;

    post.author = { _id: post.author, name: await getAnimalName(post.author) };

    return post;
}

async function addPost(title, author, content) {
    if (arguments.length !== 3) throw `Error: function addPost() expected 3 parameters but instead received ${arguments.length}`;
    if (typeof (title) !== 'string') throw `Error: function addPost() expected title to be a string but instead recieved a ${typeof (title)}`;
    if (typeof (author) !== 'string') throw `Error: function addPost() expected author to be a string but instead recieved a ${typeof (author)}`;
    if (typeof (content) !== 'string') throw `Error: function addPost() expected content to be a string but instead recieved a ${typeof (content)}`;

    const newPost = {
        title: title,
        author: author,
        content: content
    };

    const postCollection = await posts();
    const insertInfo = await postCollection.insertOne(newPost);

    if (insertInfo.insertedCount === 0) throw `Error: could not insert post: ${title} into database`;

    return newPost;
}

async function removePost(id) {
    if (arguments.length !== 1) throw `Error: function removePost() expected 1 parameter but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function removePost() expected id to be a string but instead recieved a ${typeof (id)}`;


    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function removePost() received an invalid id: ${id}`;

    const postCollection = await posts();

    const post = await getPostById(id);

    const deletionInfo = await postCollection.removeOne({ _id: objId });

    if (deletionInfo.deletedCount === 0) throw `Error: function removePost() could not succesfully remove post with the id: ${id}`;

    return post;
}

async function updateTitle(id, title) {
    if (arguments.length !== 2) throw `Error: function updateTitle() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function updateTitle() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (title) !== 'string') throw `Error: function updateTitle() expected email to be a string but instead recieved a ${typeof (title)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function updateTitle() received an invalid id: ${id}`;

    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: objId });
    if (post === null) throw `Error: function updateTitle() could not find a post with the id: ${id}`;

    let updatedPost = {
        title: title,
        author: post.author,
        content: post.content
    };

    const updateInfo = await postCollection.updateOne({ _id: objId }, { $set: updatedPost });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw `Error: function updateTitle() could not succesfully update post with the id: ${id}`;
    return await getPostById(id);
}

async function updateContent(id, content) {
    if (arguments.length !== 2) throw `Error: function updateContent() expected 2 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function updateContent() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (content) !== 'string') throw `Error: function updateContent() expected email to be a string but instead recieved a ${typeof (content)}`;

    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function updateContent() received an invalid id: ${id}`;

    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: objId });
    if (post === null) throw `Error: function updateContent() could not find a post with the id: ${id}`;

    let updatedPost = {
        title: post.title,
        author: post.author,
        content: content
    };

    const updateInfo = await postCollection.updateOne({ _id: objId }, { $set: updatedPost });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw `Error: function updateContent() could not succesfully update post with the id: ${id}`;
    return await getPostById(id);
}

async function updatePost(id, title, content) {
    if (arguments.length !== 3) throw `Error: function updatePost() expected 3 parameters but instead received ${arguments.length}`;
    if (typeof (id) !== 'string') throw `Error: function updatePost() expected id to be a string but instead recieved a ${typeof (id)}`;
    if (typeof (title) !== 'string') throw `Error: function updatePost() expected title to be a string but instead recieved a ${typeof (title)}`;
    if (typeof (content) !== 'string') throw `Error: function updatePost() expected email to be a string but instead recieved a ${typeof (content)}`;


    const objId = ObjectId.createFromHexString(id);
    if (!ObjectId.isValid(objId)) throw `Error: function updatePost() received an invalid id: ${id}`;

    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: objId });
    if (post === null) throw `Error: function updatePost() could not find a post with the id: ${id}`;

    const updatedPost = {
        title: title,
        author: post.author,
        content: content
    };

    const updateInfo = await postCollection.updateOne({ _id: objId }, { $set: updatedPost });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw `Error: function updatePost() could not succesfully update post with the id: ${id}`;
    return await getPostById(id);
}

module.exports = {
    getPostTitle,
    getAllPosts,
    getPostById,
    addPost,
    removePost,
    updateTitle,
    updateContent,
    updatePost
}