const axios = require('axios');
async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    return data // this will be the array of people
}

async function getPersonById(id) {
    if(arguments.length !== 1) {
        throw "Error: incorrect number of arguments for getPersonById()";
    }

    if(isNaN(id)) {
        throw "Error: id given to getPersonById() is not a number";
    }
    
    const data = await getPeople();

    for(i = 0; i < data.length; i++) {
        const obj = data[i];
        if(obj.id === id) {
            return obj.firstName + " " + obj.lastName;
        }
    }

    throw "Error: id given to getPersonById() is not in bounds";
}

function sortJson(a, b){
    const aName = a.lastName.toUpperCase();
    const bName = b.lastName.toUpperCase();

    if(aName > bName) {
        return 1;
    }
    else if(aName < bName) {
        return -1;
    }

    return 0;
}

async function lexIndex(index) {
    if(arguments.length !== 1) {
        throw "Error: incorrect number of arguments for lexIndex()";
    }
    
    if(isNaN(index)) {
        throw "Error: index given to lexIndex() is not a number";
    }

    if(index < 0) {
        throw "Error: index given to lexIndex() is not in bounds";
    }
    
    const data = await getPeople();

    if(index >= data.length) {
        throw "Error: index given to lexIndex() is not in bounds";
    }

    data.sort(sortJson);
    const person = data[index];
    return person.firstName + " " + person.lastName;
}

async function firstNameMetrics() {
    if(arguments.length !== 0) {
        throw "Error: incorrect number of arguments for firstNameMetrics()";
    }

    const data = await getPeople();

    let tLet = 0;
    let tVow = 0;
    let tCons = 0;
    let lNameCount = -1
    let sNameCount = Number.MAX_SAFE_INTEGER;
    let lName = "";
    let sName = "";

    for(i = 0; i < data.length; i++) {
        let name = data[i].firstName;

        if(name.length > lNameCount) {
            lNameCount = name.length;
            lName = name;
        }

        if(name.length < sNameCount) {
            sNameCount = name.length;
            sName = name;
        }

        tLet += name.length;
        name = name.toUpperCase();
        for(j = 0; j < name.length; j++) {
            switch(name.charAt(j)) {
                case 'A':
                    tVow++;
                    break;
                case 'E':
                    tVow++;
                    break;
                case 'I':
                    tVow++;
                    break;
                case 'O':
                    tVow++;
                    break;
                case 'U':
                    tVow++;
                    break;
                default:
                    tCons++;
            }
        }
    }

    const output = `totalLetters: ${tLet},\ntotalVowels: ${tVow},\n\
totalConsonants: ${tCons},\n\
longestName: ${lName},\n\
shortestName: ${sName}`;

    return output;
}

module.exports = {
    getPersonById,
    getPeople,
    lexIndex,
    firstNameMetrics
};