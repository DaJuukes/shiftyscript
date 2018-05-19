const {EventEmitter} = require('events');

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Parser extends EventEmitter {


    constructor (array) {
        super();
        this.array = array;
        this.waiting = false;
        this.str = "";
    }

    parseLine(text) {
        const arr = text.split(' ');
        for (let n of arr) {
            if (n != "heck") throw new Error('Unrecognized input');
        }

        if (this.waiting) {
            if (arr.length == 1) {
                this.waiting = false;
                this.str += '");';
                let nstr = this.str;
                this.str = "";
                return nstr;
            }
            this.str += alphabet.charAt(arr.length - 2);

        }

        switch (arr.length) {
        case 1:
            this.waiting = true;
            this.str = 'console.log("';
        }

        return null;
    }

    parse() {
        let arr = [];
        for (let i = 0; i < this.array.length; i++) {
            if (!this.array[i].length == 0) {
                const result = this.parseLine(this.array[i]);
                if (result) {
                    arr.push(result);
                }
            }
        }
        return arr;
    }

}

module.exports = Parser;
