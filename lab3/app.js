async function tryblock(func, ...args) {
    try {
        console.log(await func(...args));
    } catch(e) {
        console.log(e);
    }
}


const people = require("./people");
const weather = require("./weather");
const work  = require("./work");

async function main(){
    await tryblock(people.getPersonById, 43);
    await tryblock(people.lexIndex, 2);
    await tryblock(people.firstNameMetrics);
    await tryblock(weather.shouldTheyGoOutside, "Scotty", "Barajaz");
    await tryblock(weather.shouldTheyGoOutside, "Bob", "Smith");
    await tryblock(weather.shouldTheyGoOutside, "Calli", "Ondrasek");
    await tryblock(work.whereDoTheyWork, "Demetra", "Durrand");
    await tryblock(work.whereDoTheyWork, "Hank", "Tarling");
    await tryblock(work.findTheHacker, "79.222.167.180");

}

//call main
main();