const axios = require('axios');
const people = require('./people');
async function getWeather(){
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json')
    return data // this will be the array of weather
}

async function shouldTheyGoOutside(firstName, lastName) {
    if(arguments.length !== 2) {
        throw "Error: incorrect number of arguments for function shouldTheyGoOutside()"
    }

    if(typeof(firstName) !== "string") {
        throw "Error: firstName given to shouldTheyGoOutside() is not a string"
    }

    if(typeof(lastName) !== "string") {
        throw "Error: lastName given to shouldTheyGoOutside() is not a string"
    }

    const pList = await people.getPeople();
    let found = false;
    let zip = "";

    for(i = 0; i < pList.length; i++) {
        const person = pList[i];
        if(person.firstName === firstName && person.lastName === lastName) {
            zip = person.zip;
            found = true;
            break;
        }
    }

    if(!found) {
        throw `Error: ${firstName} ${lastName} not found in people.json`;
    }

    const weather = await getWeather();

    for(i = 0; i < weather.length; i++) {
        const area = weather[i];
        if(area.zip === zip) {
            if(area.temp >= 34) {
                return `Yes, ${firstName} should go outside.`
            }
            else {
                return `No, ${firstName} should not go outside.`
            }
        }
    }
}

module.exports = {
    shouldTheyGoOutside
};