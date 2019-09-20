function capitalize(str) {
    if(capitalize.arguments.length !== 1) {
        throw "Error: Incorrect number of paramters for capitalize()";
    }

    if(typeof(str) !== 'string') {
        throw "Error: First parameter of capitalize() is not a string";
    }

    if(str === "") {
        return "";
    }
    
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function repeat(str, num) {
    if(repeat.arguments.length !== 2) {
        throw "Error: Incorrect number of paramters for repeat()";
    }

    if(typeof(str) !== 'string') {
        throw "Error: First parameter of repeat() is not a string";
    }

    if(isNaN(num)) {
        throw "Error: Second parameter of repeat() is not a number";
    }

    if(num < 0) {
        throw "Error: The number of times to repeat must be atleast zero";
    }

    if(num === 0 || str === "") {
        return "";
    }
    else if (num === 1) {
        return str;
    }

    let output = "";

    for(i = 0; i < num; i++) {
        output += str;
    }

    return output;
}

function countChars(str) {
    if(countChars.arguments.length !== 1) {
        throw "Error: Incorrect number of paramters for countChars()";
    }

    if(typeof(str) != 'string') {
        throw "Error: First parameter of countChars() is not a string";
    }

    // Randomly choose a solution because I got bored
    if(Math.floor(Math.random() * 2) === 0) {
        /* This is the easy method */

        const borrow = require("./arrayUtils");
        // used the spread operator that I learned before here
        // see index.js to find where I first saw it
        return borrow.countElements([...str]);
    
    }

    /* This is the more efficient method */
    const count = { };
    for(i = 0; i < str.length; i++) {
        if(count[str.charAt(i)] !== undefined) {
            continue;
        }
        let num = 1;
        for(j = i + 1; j < str.length; j++) {
            if(str.charAt(i) === str.charAt(j)) {
                num++;
            }
        }
        count[str.charAt(i)] = num;
    }
    
    return count;
}

module.exports = {
    capitalize,
    repeat,
    countChars
}