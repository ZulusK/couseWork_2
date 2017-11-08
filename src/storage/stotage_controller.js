"use strict";
let storage = require('./storage');
let readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);


function question(str) {
    return new Promise((resolve) => {
        rl.question(str + " ", (answer) => {
            resolve(answer);
        });
    });
}

function askMainQuestion() {
    console.log("Enter command to continue:");
    console.log("new    - to create new publication");
    console.log("get    - to get publication from DB");
    console.log("remove - to remove publication from DB");
    console.log("list   - to get all publications");
    console.log("update - to update some publication");
    // console.log("exit   - to close the program");
    question("Your input: ").then(processInput);
}

function cancel() {
    console.log(`Exit.`);
    rl.close();
}

function check(promise, callback_success, callback_error) {
    promise.then((res) => {
        console.log("\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        if (callback_success !== undefined) {
            callback_success(res);
        } else {
            console.log("Success: " + (res !== undefined) ? res : "");
        }
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    }).catch((res) => {
        console.log("\n----------------------------------------------------------");
        if (callback_error !== undefined) {
            callback_error(res);
        } else {
            console.log("Success: " + (res !== undefined) ? res : "");
        }
        console.log("----------------------------------------------------------");
    });
}


function create() {
    console.log("\nNow you are in create mode\n");
    console.log("Enter params for new publication\n");
    let title;
    let author;
    let difficult;
    let tags;
    let text;
    let author_link;
    let image_name;
    let description;
    question('Enter title of publication: ')
        .then((answer) => {
            title = answer;
            return question('Enter author of publication:');
        })
        .then((answer) => {
            author = answer;
            return question('Enter your nickname at telegram:');
        })
        .then((answer) => {
            author_link = answer;
            return question('Enter difficult of publication:');
        })
        .then((answer) => {
            difficult = Number(answer);
            return question('Enter name of picture to use in publication (it should be in "public/images/publications" folder)');
        })
        .then((answer) => {
            image_name = answer;
            return question('Enter tags of publication, split by space:');
        })
        .then((answer) => {
            tags = answer.split(" ");
            return question('Enter short description of publication');
        })
        .then((answer) => {
            description = answer;
            return question('Enter name of publication(use `!\\n!` to break line):\n');
        })
        .then((answer) => {
            text = answer.split(`!\\n!`);
            check(storage.create(title, author, author_link, new Date().toISOString(), image_name, tags, difficult, description, text));
            askMainQuestion();
        });
}


function list() {
    check(storage.getAll(), (data) => {
        if (data.length === 0) {
            console.log('Storage is empty');
        } else {
            for (let a of data) {
                console.log(JSON.stringify(a));
            }
        }
    });
    askMainQuestion();
}

function get() {
    console.log("\nNow you are in get mode\n");
    question('Enter id of publication:')
        .then((answer) => {
            let id = Number(answer);
            check(storage.getById(id), (data) => {
                console.log(JSON.stringify(data));
            });
            askMainQuestion();
        });
}

function remove() {
    console.log("\nNow you are in remove mode\n");
    question('Enter id of publication to remove:')
        .then((answer) => {
            let id = Number(answer);
            check(storage.remove(id));
            askMainQuestion();
        });
}

function update() {
    console.log("\nNow you are in update mode\n");
    let id;
    let property;
    let value;
    question('Enter id of publication to update:')
        .then((answer) => {
            id = Number(answer);
            return question('Enter title of property to update');
        })
        .then((answer) => {
            property = answer.trim();
            return question('Enter value of property');
        })
        .then((answer) => {
            value = answer;
            check(storage.update(id, property, value));
            askMainQuestion();
        });
}

function processInput(buffer) {
    let inputString = buffer.toString().trim().toLowerCase();
    // console.log(`You've entered: '${inputString}'`);
    if (!inputString) {
        askMainQuestion();  // ask the question again
    } else {
        switch (inputString) {
            // case "exit":
            //     cancel();
            //     return;
            //     break;
            case "new":
                create();
                break;
            case "list":
                list();
                break;
            case "get":
                get();
                break;
            case "remove":
                remove();
                break;
            case "update":
                update();
                break;
            default:
                console.log("Sorry. Try again\n");
                askMainQuestion();
                break;
        }
    }
}

module.exports = {start: askMainQuestion};
