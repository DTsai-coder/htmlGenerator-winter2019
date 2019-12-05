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