function tryblock(func, ...args) {
    try {
        // found this line from https://stackoverflow.com/questions/2856059/passing-an-array-as-a-function-parameter-in-javascript and learned about the spread operator
        console.log(func(...args));
        //console.log(func.apply(this, args));
    } catch(e) {
        console.log(e);
    }
}

function square(num) {
    if(square.arguments.length !== 1) {
        throw "Error: Incorrect number of arguments";
    }

    if(isNaN(num)) {
        throw "Error: Argument is not a number";
    }

    return num*num;
}

const aUtils = require("./arrayUtils");
const sUtils = require("./stringUtils");
const oUtils = require("./objUtils");

tryblock(aUtils.head, [1,2,3]); // should return 1;
tryblock(aUtils.head, []); // should throw an error

tryblock(aUtils.range, 2, -1); // should return [-1, -1]
tryblock(aUtils.range, 0, 3, 4); // should throw an error

tryblock(sUtils.repeat, "", 9999999999); // should return ""
tryblock(sUtils.repeat, "abc", -7); // should throw an error

const obj = {'a': 1, 'b': 2, 'c':3};
const x = 0;
tryblock(oUtils.mapValues, obj, square); // should return { a: 1, b: 4, c: 9 }
tryblock(oUtils.mapValues, x, square); // should throw an error
