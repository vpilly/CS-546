const axios = require('axios');
async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    return data // this will be the array of people
}


async function getPersonById(id) {
    if (arguments.length !== 1) {
        throw "Error: incorrect number of arguments for getPersonById()";
    }

    if (isNaN(id)) {
        throw "Error: name given to getPersonById() is not a number";
    }

    const data = await getPeople();

    for (i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj.id === id) {
            return obj;
        }
    }

    throw "Error: no person with that id";
}

async function findPeopleByName(personName) {
    if (arguments.length !== 1) {
        throw "Error: incorrect number of arguments for findPeopleByName()";
    }

    if (typeof (personName) !== 'string') {
        throw "Error: name given to findPeopleByName() is not a string";
    }

    const data = await getPeople();
    const people = [];
    let len = 0;
    for (i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj.firstName === personName) {
            people.push({ id: obj.id, name: `${obj.firstName} ${obj.lastName}` });
            len++;
        }
        else if (obj.lastName === personName) {
            people.push({ id: obj.id, name: `${obj.firstName} ${obj.lastName}` });
            len++;
        }
        if (len === 20) break;
    }

    return people;
}

module.exports = {
    getPersonById,
    findPeopleByName
};