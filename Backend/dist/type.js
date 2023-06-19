"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i = 0;
const express = require('express');
exports.default = express;
const PORT = 6000;
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const { isNumber } = require('util');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
function isNotDigit(char) { return char > '9' || char < '0'; }
function isnumber(str) {
    for (let i = 0; i < str.length; i++) {
        if (isNotDigit(str.charAt(i)))
            return false;
    }
    return true;
}
function isBookName(str) {
    for (let i = 0; i < str.length; i++) {
        if (isNotDigit(str.charAt(i)))
            return true;
    }
    return false;
}
function isGaner(str) {
    let up = str.toUpperCase();
    return up === 'DRAMA' || up === 'KOMEDY' || up === 'ACTION' || up === 'REAL' || up === 'IMAGINE';
}
var Ganer;
(function (Ganer) {
    Ganer[Ganer["Drama"] = 0] = "Drama";
    Ganer[Ganer["Komedy"] = 1] = "Komedy";
    Ganer[Ganer["Action"] = 2] = "Action";
    Ganer[Ganer["Real"] = 3] = "Real";
    Ganer[Ganer["Imagine"] = 4] = "Imagine";
})(Ganer || (Ganer = {}));
class book {
    constructor(bookname, writer, bookganer) {
        this.bookname = bookname;
        this.writer = writer;
        this.id = i;
        this.bookganer = bookganer;
        i++;
    }
    getbookname() { return this.bookname; }
    getID() { return this.id; }
    printer() {
        let res = '';
        res += `book name: ${this.bookname}\n`;
        res += `writer: ${this.writer}\n`;
        res += `book ganer: ${this.bookganer}\n`;
        return res;
    }
    equals(book) { return this.bookname === book.bookname && this.writer === book.writer && this.bookganer === book.bookganer; }
}
let ourbooks = [];
app.get('/find', (req, res) => {
    let element = req.query.element;
    let flag = false;
    let idFlag;
    if (isnumber(element))
        idFlag = true;
    else
        idFlag = false;
    if (idFlag) {
        for (let i = 0; i < ourbooks.length; i++) {
            if (ourbooks[i].getID() == element) {
                res.send(ourbooks[i]);
                flag = true;
                break;
            }
        }
    }
    else {
        for (let i = 0; i < ourbooks.length; i++) {
            if (ourbooks[i].getbookname() === element) {
                res.send(ourbooks[i]);
                flag = true;
                break;
            }
        }
    }
    if (!flag) {
        if (idFlag)
            res.send("The id of the book doesn't exists!");
        else
            res.send("The name of the book doesn't exists!");
    }
});
app.get('/findAll', (req, res) => {
    let result = '';
    ourbooks.forEach(book => result += book.printer());
    res.send(result);
});
app.get('/create', (req, res) => {
    let bookname = req.query.bookname;
    if (!isBookName(bookname))
        res.send("The book name is not valid!");
    else {
        let ganer = req.query.ganer;
        if (!isGaner(ganer))
            res.send("The ganer is not Valid");
        else {
            let writer = req.query.writer;
            let newBook = new book(bookname, writer, ganer);
            let flag = true;
            for (let j = 0; j < ourbooks.length; j++) {
                if (newBook.equals(ourbooks[j])) {
                    flag = false;
                    i--;
                    break;
                }
            }
            if (flag) {
                ourbooks.push(newBook);
                res.send(newBook);
            }
            else
                res.send("The book Already exists!");
        }
    }
});
app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));
