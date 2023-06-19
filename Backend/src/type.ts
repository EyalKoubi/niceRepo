let i: number = 0;

const express = require('express');

export default express;

const PORT = 6000;
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const { isNumber } = require('util');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function isNotDigit(char: any) {return char > '9' || char < '0';}

function isnumber(str: string) {
    for (let i=0; i < str.length; i++) {
        if (isNotDigit(str.charAt(i)))
            return false;
    }
    return true;
}

function isBookName(str: string) {
    for (let i=0; i < str.length; i++) {
        if (isNotDigit(str.charAt(i))) return true;
    }
    return false;
}

function isGaner(str: string) {
    let up = str.toUpperCase();
    return up === 'DRAMA' || up === 'KOMEDY' || up === 'ACTION' || up === 'REAL' || up ==='IMAGINE';
}

enum Ganer { Drama, Komedy, Action, Real, Imagine }

class book {
    private bookname: string
    private writer: string
    private id: number
    private bookganer: Ganer
    constructor(bookname: string, writer: string, bookganer: Ganer) {
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
    equals(book: book)
    { return this.bookname === book.bookname && this.writer === book.writer && this.bookganer === book.bookganer; }
}

let ourbooks: book[] = [];

app.get('/find', (req: any,res: any) => {

    let element = req.query.element;
    let flag: boolean = false;
    let idFlag: boolean;

    if (isnumber(element))
        idFlag = true;
    else
        idFlag = false;

    if (idFlag) {
        for (let i=0; i < ourbooks.length; i++) {
            if (ourbooks[i].getID() == element) {
                res.send(ourbooks[i]);
                flag = true;
                break;
            }
        }
    }

    else {
        for (let i=0; i < ourbooks.length; i++) {
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

app.get('/findAll', (req: any,res: any) => {
    let result = '';
    ourbooks.forEach(book => result+=book.printer());
    res.send(result);
});

app.get('/create', (req: any,res: any) => {
    let bookname = req.query.bookname;
    if (!isBookName(bookname))
        res.send("The book name is not valid!");
    else {
        let ganer = req.query.ganer;
        if (!isGaner(ganer))
            res.send("The ganer is not Valid");
        else {
            let writer = req.query.writer;
            let newBook: book = new book(bookname,writer,ganer);
            let flag: boolean = true;
            for (let j=0; j < ourbooks.length; j++) {
                if (newBook.equals(ourbooks[j])) {
                    flag = false;
                    i--;
                    break;
                }
            }
            if (flag) {
                ourbooks.push(newBook);
                res.send(newBook);
            } else
                res.send("The book Already exists!");
        }
    }
});

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));