/*
let needToUpdate = 0;

let myFirstPromise = new Promise((resolve, reject) => {

    let saveThis = needToUpdate;

    setTimeout(resolve(), 2000);
});

myFirstPromise.then(() => {
    console.log("This promise was fulfilled!")
}).finally(() => {
    console.log("We are done here!")
});

Promise.all // .all is a STATIC METHOD part of a class definition, but is not part of the objects it creates.

console.log("This runs after calling the Promise!");


let storedFunction = function runThisFunction(myFunction){
    setTimeout(myFunction, 2000);
}

// storedFunction();
// storedFunction;

runThisFunction(() => {console.log("Goodbye!")});
*/

let convertToF = (celsius) => {
    return (celsius * (9/5)) + 32;
};

let convertToC = (feren) => {
    return ((feren - 32) *5) / 9;
};

// console.log( convertToC(convertToF(convertToC( convertToF(30) ) ) ) );

let convertToTempScale = (scale, temp) => {
    if (scale === "f") {
        return convertToF(temp);
    }else if (scale === "c"){
        return convertToC(temp);
    }else{
        return NaN;
    }
};

console.log(convertToTempScale("c", 24));

let convertTempCustom = (temp, equation) => {
    return equation(temp);
};

console.log(convertTempCustom(32, convertToC));

console.log(convertTempCustom(32, (f) => {
    // return (f - 32) * (5/9) + 273.15;
    return convertToC(f) + 273.15;
}));

let myArray = [100, 32, 4993, 392, 30, 30];

// .map runs for each item in the array, in this case calculate return num * 2 
let newArray = myArray.map((num) => {
    // return num * 2;
    if (num == 100 || num == 30){ // this will set 100 and 30s in the array to null.
        return null;
    }else{
        return num;
    }
});

console.log(myArray, "\n", newArray);