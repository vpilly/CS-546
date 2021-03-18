async function tryblock(func, ...args) {
    try {
        console.log(await func(...args));
    } catch (e) {
        console.log(e);
    }
}


const people = require("./people");
const weather = require("./weather");
const work = require("./work");

async function main() {
    await tryblock(people.getPersonById, 43);
    await tryblock(people.getPersonById, -1);
    await tryblock(people.getPersonById, 1000);
    await tryblock(people.getPersonById);
    console.log();
    await tryblock(people.lexIndex, 2);
    await tryblock(people.lexIndex, -1);
    await tryblock(people.lexIndex, 1000);
    await tryblock(people.lexIndex);
    console.log();
    await tryblock(people.firstNameMetrics);
    await tryblock(people.firstNameMetrics, 1);
    console.log();
    await tryblock(weather.shouldTheyGoOutside, "Scotty", "Barajaz");
    await tryblock(weather.shouldTheyGoOutside, "Bob", "Smith");
    await tryblock(weather.shouldTheyGoOutside, "Calli", "Ondrasek");
    await tryblock(weather.shouldTheyGoOutside, "Calli");
    await tryblock(weather.shouldTheyGoOutside);
    console.log();
    await tryblock(work.whereDoTheyWork, "Demetra", "Durrand");
    await tryblock(work.whereDoTheyWork, "Hank", "Tarling");
    await tryblock(work.whereDoTheyWork);
    await tryblock(work.whereDoTheyWork, "Bob");
    await tryblock(work.whereDoTheyWork, "Bob", "Smith");
    console.log();
    await tryblock(work.findTheHacker, "79.222.167.180");
    await tryblock(work.findTheHacker, "foobar");
    await tryblock(work.findTheHacker);

}

//call main
main();