const axios = require('axios');
const people = require('./people');
async function getWork() {
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json')
    return data // this will be the array of work
}

async function whereDoTheyWork(firstName, lastName) {
    if(arguments.length !== 2) {
        throw "Error: incorrect number of arguments given to function whereDoTheyWork()";
    }

    if(typeof(firstName) !== "string") {
        throw "Error: firstName given to whereDoTheyWork() is not a string"
    }

    if(typeof(lastName) !== "string") {
        throw "Error: lastName given to whereDoTheyWork() is not a string"
    }

    const pList = await people.getPeople();
    let found = false;
    let ssn = "";

    for(i = 0; i < pList.length; i++) {
        const person = pList[i];
        if(person.firstName === firstName && person.lastName === lastName) {
            ssn = person.ssn;
            found = true;
            break;
        }
    }

    if(!found) {
        throw `Error: ${firstName} ${lastName} not found in people.json`;
    }

    const workData = await getWork();

    for(i = 0; i < workData.length; i++) {
        const workInfo = workData[i];
        if(workInfo.ssn === ssn) {
            const output = `${firstName} ${lastName} - ${workInfo.jobTitle} at ${workInfo.company}.`;
            if(workInfo.willBeFired) {
                return output + " They will be fired."
            }
            else {
                return output + " They will not be fired."
            }
        }
    }
}

async function findTheHacker(ip) {
    if(arguments.length !== 1) {
        throw "Error: incorrect number of arguments for findTheHacker()"
    }

    if(typeof(ip) !== "string") {
        throw "Error: ip given to findTheHacker() is not a string"
    }

    const workData = await getWork();
    let ssn = "";
    let found = false;

    for(i = 0; i < workData.length; i++) {
        const workInfo = workData[i];
        if(workInfo.ip === ip) {
            ssn = workInfo.ssn;
            found = true;
        }   
    }

    if(!found) {
        throw `Error: ${ip} was not found work.json`
    }

    const pList = await people.getPeople();

    for(i = 0; i < pList.length; i++) {
        const person = pList[i];
        if(person.ssn === ssn) {
            return `${person.firstName} ${person.lastName} is the hacker!`
        }
    }

    throw `Error: ${ssn} was not found in people.json`; 
}

module.exports = {
    whereDoTheyWork,
    findTheHacker
};