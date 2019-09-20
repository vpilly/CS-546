function extend(...args) {
    if(extend.arguments.length < 2) {
        throw "Error: Incorrect number of arguments for extend()";
    }
    for(i = 0; i < args.length; i++) {
        if(typeof(args[i]) === undefined) {
            throw "Error: Given argument in extend() is undefined";
        }
        if(typeof(args[i]) !== 'object') {
            throw "Error: Given argument in extend() is not an object";
        }
    }
    const output = {};
    for(i = 0; i < args.length; i++) {
        const keys = Object.keys(args[i]);
        for(j = 0; j < keys.length; j++) {
            if(output[keys[j]] === undefined) {
                output[keys[j]] = args[i][keys[j]];
            }
        }
    }

    return output;
}

function smush(...args) {
    if(smush.arguments.length < 2) {
        throw "Error: Incorrect number of arguments for smush()";
    }
    for(i = 0; i < args.length; i++) {
        if(typeof(args[i]) === undefined) {
            throw "Error: Given argument in smush() is undefined";
        }
        if(typeof(args[i]) !== 'object') {
            throw "Error: Given argument in smush() is not an object";
        }
    }
    const output = {};
    for(i = 0; i < args.length; i++) {
        const keys = Object.keys(args[i]);
        for(j = 0; j < keys.length; j++) {
            output[keys[j]] = args[i][keys[j]];
        }
    }

    return output;
}

function mapValues(obj, func) {
    if(mapValues.arguments.length < 2) {
        throw "Error: Incorrect number of arguments for mapValues()";
    }

    if(typeof(obj) !== 'object') {
        throw "Error: First argument in mapValues() is not an object";
    }

    if(typeof(func) !== 'function') {
        throw "Error: Second argument in mapValues() is not an function";
    }

    const keys = Object.keys(obj);

    for(i = 0; i < keys.length; i++) {
        obj[keys[i]] = func(obj[keys[i]]);
    }

    return obj;
}

module.exports = {
    extend,
    smush,
    mapValues
}