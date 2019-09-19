
const words ={
    programming: "The action or process of writing computer programs.",
    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",
    sleuth: "To act as a detective : search for information",
    foray: "A sudden or irregular invasion or attack for war or spoils : raid",
    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially"
}

function checkInput(val) {
    if(checkInput.arguments.length != 1) {
        throw "Incorrect number of inputs";
    }
    if(typeof(val) === 'string') {
        return val;
    }
    throw "Value is not a string";
}

function lookupDefinition(value) {
    if(lookupDefinition.arguments.length != 1) {
        throw "Incorrect number of inputs";
    }

    checkInput(value);

    if(words[value]) {
        return words[value];
    }

    throw "Input word not in dictionary";
}

function getWord(value) {
    if(getWord.arguments.length != 1) {
        throw "Incorrect number of inputs";
    }

    checkInput(value);

    let getKey = Object.keys(words).find(key => words[key] === value);

    if(getKey == undefined) {
        throw "Input definition not in dictionary";
    }

    return getKey;
}

module.exports = {
    lookupDefinition,
    getWord
};