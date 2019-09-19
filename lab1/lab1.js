const questionOne = function questionOne(arr) {
    if(questionOne.arguments.length != 1) {
        throw "Incorrect number of arguments";
    }  
    if(arr.constructor === Array) {
        if(arr.length != 3) {
            throw "Array size is not three";
        }
        let sum = 0;
        for(i = arr.length-1; i >= 0; i--) {
            if(isNaN(arr[i])) {
                throw "Element inside array is not a number";
            }
            sum +=  Math.pow(arr[i],2);
        }
        return sum;
    }
    throw "Input is not an array";
}

/**
 * Calculates the Fibonacci of given int
 * Assumes that input is valid
 * @param {int} num - number to calculate Fibonacci of 
 */
const fib = function fib(num) {
    if(num < 0) {
        return 0;
    }
    else if(num == 1) {
        return 1;
    }
    return fib(num-1) + fib(num-2);
}

const questionTwo = function questionTwo(num) {
    if(questionTwo.arguments.length != 1) {
        throw "Incorrect number of arguments";
    }  
    if(isNaN(num)) {
        throw "Cannot compute the Fibonacci of something that is not a number";
    }
    return fib(num);
}

const questionThree = function questionThree(text) {
    if(questionThree.arguments.length != 1) {
        throw "Incorrect number of arguments";
    }  
    if (typeof text === 'string' || text instanceof String) {
        let count = 0;
        for(i = text.length-1; i >=0; i--) {
            switch(text.charAt(i)) {
                case 'a':
                    count++;
                    break;
                case 'e':
                    count++;
                    break;
                case 'i':
                    count++;
                    break;
                case 'o':
                    count++;
                    break;
                case 'u':
                    count++;
                    break;
            }
        }
        return count;
    }
    throw "Input is not a string";
}

/**
 * Computes the factorial of given int
 * Assumes that input is valid
 * @param {int} num - int to take the factorial of 
 */
const fact = function fact(num) {
    if(num < 0) {
        return NaN;
    }
    else if (num < 2) {
        return 1;
    }

    return num*fact(num-1);
}

const questionFour = function questionFour(num) {
    if(questionFour.arguments.length != 1) {
        throw "Incorrect number of inputs";
    }  
    if(isNaN(num)) {
        throw "Input is not an integer"
    }
    else if(num < 0) {
        return NaN;
    }
    return fact(num);
}

module.exports = {
    firstName: "Varun", 
    lastName: "Pilly", 
    studentId: "10419906",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};