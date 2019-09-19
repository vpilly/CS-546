const dict = require("./dictionary.js");
try {
    console.log(dict.lookupDefinition("programming"));
} catch (error) {
    console.log(error);
}

try {
    console.log(dict.lookupDefinition("hello"));
} catch (error) {
    console.log(error);
}

try {
    console.log(dict.lookupDefinition("foray"));
} catch (error) {
    console.log(error);
}

try {
    console.log(dict.lookupDefinition("Foray"));
} catch (error) {
    console.log(error);
}

// get word tests
try{
    console.log(dict.getWord("The action or process of writing computer programs."));
}catch (error){
    console.log(error)
}

try{
    console.log(dict.getWord("This shouldn't be in there"));
}catch (error){
    console.log(error)
}

try{
    console.log(dict.getWord("To act as a detective : search for information"));
}catch (error){
    console.log(error)
}