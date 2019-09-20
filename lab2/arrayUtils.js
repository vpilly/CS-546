function head(arr) {
    if(head.arguments.length !== 1) {
        throw "Error: Function head() was called with the incorrect number of arguments";
    }

    if(!Array.isArray(arr)) {
        throw "Error: Input to head() was not an array";
    }

    if(arr.length === 0) {
        throw "Error: Empty array was given to head()";
    }

    return arr[0];
}

function last(arr) {
    if(last.arguments.length !== 1) {
        throw "Error: Function last() was called with the incorrect number of arguments";
    }

    if(!Array.isArray(arr)) {
        throw "Error: Input to last() was not an array";
    }

    if(arr.length === 0) {
        throw "Error: Empty array was given to last()";
    }

    return arr[arr.length-1];
}

function remove(arr, pos) {
    if(remove.arguments.length !== 2) {
        throw "Error: Function remove() was called with the incorrect number of arguments";
    }

    if(!Array.isArray(arr)) {
        throw "Error: First argument given to remove() was not an array";
    }

    if(isNaN(pos)) {
        throw "Error: Index given to remove() was not a number";
    }

    if(arr.length === 0) {
        throw "Error: Empty array was given to remove()";
    }

    if(pos < 0 || pos >= arr.length) {
        throw "Error: Index given to remove() was out of bounds";
    }

    arr.splice(pos, 1)

    return arr;
}

function range(end, val) {
    const arg = range.arguments.length;
    if(arg !== 1 && arg !== 2) {
        throw "Error: Incorrect number of parameters for range()"
    }

    if(isNaN(end)) {
        throw "Error: First arguments for range is not a number";
    }

    if(end <= 0) {
        throw "Error: End must be a positive integer greater than zero";
    }

    let arr = [];
    for(i = 0; i < end; i++) {
        if(arg === 1) {
            arr.push(i);
        }
        else arr.push(val);  
    }
    
    return arr;
}

function countElements(arr) {
    if(countElements.arguments.length !== 1) {
        throw "Error: Function countElements() was called with the incorrect number of arguments";
    }
    if(!Array.isArray(arr)) {
        throw "Error: First argument given to countElements() was not an array";
    }

    const count = { };
    for(i = 0; i < arr.length; i++) {
        if(count[arr[i]] !== undefined) {
            continue;
        }
        let num = 1;
        for(j = i + 1; j < arr.length; j++) {
            if(arr[i] === arr[j]) {
                num++;
            }
        }
        count[arr[i]] = num;
    }
    
    return count;
}

function isEqual(arrOne, arrTwo) {
    if(isEqual.arguments.length !== 2) {
        throw "Error: Function isEqual() was called with the incorrect number of arguments";
    }
    if(!Array.isArray(arrOne)) {
        throw "Error: First argument given to isEqual() was not an array";
    }
    if(!Array.isArray(arrTwo)) {
        throw "Error: Second argument given to isEqual() was not an array";
    }

    if(arrOne.length !== arrTwo.length) {
        return false;
    }

    for(i = 0; i < arrOne.length; i++) {
        if(arrOne[i] !== arrTwo[i]) {
            return false;
        }
    }

    return true;
}

module.exports = {
    head,
    last,
    remove,
    range,
    countElements,
    isEqual
};