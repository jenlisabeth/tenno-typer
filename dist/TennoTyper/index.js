"use strict";
class TennoTyper {
    constructor() {
        this.c = document.createElement('canvas');
        this.ctx = c.getContext('2d');
        this.js = {
            path: "./javascripts/",
            ext: ".js",
        };
        this.offset = {
            xOffset: 0,
            yOffset: 0,
        };
        this.background = false;
        this.phonet = true;
        this.boldify = false;
        this.languages = ["tenno", "corpus", "grineer"];
        this.grineer = new function () {
            this.folder = "./images/grineer/";
            this.pre = 'g';
            this.ext = ".png";
            this.centered = false;
            this.spacing = {
                LineHeight: 15,
                SpaceWidth: 25,
                LetterSpacing: 5,
            };
            this.imgs = [];
            chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z', "Question", "Period", "Comma", "Hash", "At", '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            for (var a = 0; a < chars.length; a++) {
                switch (chars[a]) {
                    case 'Question':
                        this.imgs['?'] = new Image();
                        this.imgs['?'].src = this.folder + this.pre + chars[a] + this.ext;
                        break;
                    case 'Comma':
                        this.imgs[','] = new Image();
                        this.imgs[','].src = this.folder + this.pre + chars[a] + this.ext;
                        break;
                    case 'Period':
                        this.imgs['.'] = new Image();
                        this.imgs['.'].src = this.folder + this.pre + chars[a] + this.ext;
                        break;
                    case 'Hash':
                        this.imgs['#'] = new Image();
                        this.imgs['#'].src = this.folder + this.pre + chars[a] + this.ext;
                        break;
                    case 'At':
                        this.imgs['@'] = new Image();
                        this.imgs['@'].src = this.folder + this.pre + chars[a] + this.ext;
                        break;
                    default:
                        this.imgs[chars[a]] = new Image();
                        this.imgs[chars[a]].src = this.folder + this.pre + chars[a] + this.ext;
                }
            }
            this.placeWord = function (ctx, word) {
                var offset = 0;
                var img;
                for (letter in word) {
                    img = this.imgs[word[letter]];
                    if (img != undefined) {
                        ctx.rect(offset, 0, img.width, img.height);
                        ctx.drawImage(img, offset, 0);
                        offset += (img.width + this.spacing.LetterSpacing);
                    }
                }
            };
            this.getWordLength = function (word) {
                var len = 0;
                var img;
                for (letter in word) {
                    img = this.imgs[word[letter]];
                    if (img != undefined) {
                        len += (img.width + this.spacing.LetterSpacing);
                    }
                }
                return (len - this.spacing.LetterSpacing);
            };
            this.getWordHeight = function (word) {
                var height = 0;
                var img;
                for (letter in word) {
                    img = this.imgs[word[letter]];
                    if (img != undefined && img.height > height) {
                        height = img.height;
                    }
                }
                return height;
            };
            this.getWordHeightOffset = function (word) {
                return 0;
            };
            this.modify = function (str) {
                str = str.replace(/qu/g, "kw");
                str = str.replace(/q/g, "kw");
                str = str.replace(/x/g, "ks");
                return str;
            };
        };
        this.corpus = new function () {
            this.folder = "./images/corpus/";
            this.pre = 'c';
            this.ext = ".png";
            this.centered = true;
            this.spacing = {
                LineHeight: 20,
                SpaceWidth: 25,
                LetterSpacing: 5,
            };
            this.imgs = [];
            this.bImgs = [];
            chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z', '0', '1'];
            for (var index = 0; index < chars.length; index += 1) {
                this.imgs[chars[index]] = new Image();
                this.imgs[chars[index]].src = this.folder + this.pre + chars[index] + this.ext;
                this.bImgs[chars[index]] = new Image();
                this.bImgs[chars[index]].src = this.folder + 'b' + this.pre + chars[index] + this.ext;
            }
            this.placeWord = function (ctx, word) {
                var offset = 0;
                var img;
                var imgs = this.imgs;
                if (boldify) {
                    imgs = this.bImgs;
                }
                for (letter in word) {
                    img = imgs[word[letter]];
                    if (img != undefined) {
                        ctx.rect(offset, 0, img.width, img.height);
                        ctx.drawImage(img, offset, 0);
                        offset += (img.width + this.spacing.LetterSpacing);
                    }
                }
            };
            this.getWordLength = function (word) {
                var len = 0;
                var img;
                var imgs = this.imgs;
                if (boldify) {
                    imgs = this.bImgs;
                }
                for (letter in word) {
                    img = imgs[word[letter]];
                    if (img != undefined) {
                        len += (img.width + this.spacing.LetterSpacing);
                    }
                }
                return (len - this.spacing.LetterSpacing);
            };
            this.getWordHeight = function (word) {
                var height = 0;
                var img;
                var imgs = this.imgs;
                if (boldify) {
                    imgs = this.bImgs;
                }
                for (letter in word) {
                    img = imgs[word[letter]];
                    if (img != undefined && img.height > height) {
                        height = img.height;
                    }
                }
                return height;
            };
            this.getWordHeightOffset = function (word) {
                return 0;
            };
        };
        this.tenno = new function () {
            this.folder = "./images/tenno/";
            this.pre = 't';
            this.ext = ".png";
            this.recalc = true;
            this.currWord = "";
            this.currWordArray = [];
            this.dim = [0, 0, 0, 0];
            this.centered = true;
            this.rot = 24.3 * Math.PI / 180;
            this.spacing = {
                LineHeight: 15,
                SpaceWidth: 20,
                LetterSpacing: 0,
            };
            this.vowels = ['a', 'e', 'i', 'o', 'u', 'w', 'y', 'ee', 'aw', 'oo', 'ae', 'aye', 'ow'];
            this.misc = [',', '.', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            this.imgs = [];
            this.chars = ['aye', 'ae', 'ow', 'aw', 'ee', 'i', 'e', 'a', 'u', 'oo', 'o', 'th', 'dh', 'sh', 'zh', 'ch', 'kh', 'ng', 'p', 'b', 't', 'd', 's', 'z', 'j', 'k', 'g', 'f', 'v', 'm', 'n', 'h', 'r', 'l', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', "Period", "Comma", "Hyphen"];
            for (var a = 0; a < this.chars.length; a++) {
                switch (this.chars[a]) {
                    case 'Comma':
                        this.imgs[','] = new Image();
                        this.imgs[','].src = this.folder + this.pre + this.chars[a] + this.ext;
                        this.chars[a] = ',';
                        break;
                    case 'Hyphen':
                        this.imgs['-'] = new Image();
                        this.imgs['-'].src = this.folder + this.pre + this.chars[a] + this.ext;
                        this.chars[a] = '-';
                        break;
                    case 'Period':
                        this.imgs['.'] = new Image();
                        this.imgs['.'].src = this.folder + this.pre + this.chars[a] + this.ext;
                        this.chars[a] = '.';
                        break;
                    default:
                        this.imgs[this.chars[a]] = new Image();
                        this.imgs[this.chars[a]].src = this.folder + this.pre + this.chars[a] + this.ext;
                }
            }
            this.placeWord = function (ctx, word) {
                if (this.recalc || this.currWord != word) {
                    this.currWord = word;
                    this.currWordArray = this.phoneticize(word);
                    this.dim = this.getWordDimensions(word);
                    this.recalc = false;
                }
                var pCha = 0;
                var xOff = this.dim[3];
                var yOff = this.dim[2];
                var exta = 0;
                var ref;
                var img;
                for (var a = 0; a < this.currWordArray.length; a++) {
                    ref = this.currWordArray[a];
                    img = this.imgs[ref];
                    if (img != undefined) {
                        if (find(ref, this.misc)) {
                            if (exta > 0) {
                                var tmp = img.height / Math.tan(this.rot);
                                if (exta > tmp) {
                                    xOff += tmp;
                                }
                                else {
                                    xOff += exta;
                                }
                                exta = 0;
                            }
                            else if (-exta > img.width) {
                                exta += img.width;
                            }
                            else {
                                exta = 0;
                            }
                            ctx.rect(xOff, yOff, img.width, img.height);
                            ctx.drawImage(img, xOff, yOff);
                            xOff += img.width;
                            pCha = 1;
                        }
                        else if (find(ref, this.vowels)) {
                            var mWid = img.width;
                            var b = a;
                            a++;
                            while (find(this.currWordArray[a], this.vowels)) {
                                img = this.imgs[this.currWordArray[a]];
                                mWid += img.width + this.spacing.LetterSpacing;
                                a++;
                            }
                            a--;
                            mWid -= this.spacing.LetterSpacing;
                            if (pCha == 0) {
                                xOff += mWid * Math.cos(this.rot);
                            }
                            if (exta < 0) {
                                if (mWid >= -exta) {
                                    xOff -= exta;
                                }
                                else {
                                    xOff += mWid * Math.cos(this.rot) + (-exta) * Math.sin(this.rot) * Math.sin(this.rot);
                                }
                            }
                            ctx.translate(xOff, yOff);
                            ctx.rotate(this.rot);
                            for (; b <= a; b++) {
                                img = this.imgs[this.currWordArray[b]];
                                ctx.rect(-mWid, -img.height, img.width, img.height);
                                ctx.drawImage(img, -mWid, -img.height);
                                mWid -= img.width + this.spacing.LetterSpacing;
                            }
                            ctx.rotate(-this.rot);
                            ctx.translate(-xOff, -yOff);
                            var off = mWid * Math.cos(this.rot);
                            if (exta < 0) {
                                if (-exta < off) {
                                    xOff -= exta;
                                }
                                else {
                                    xOff += off;
                                }
                                exta = 0;
                            }
                            pCha = 2;
                        }
                        else {
                            ctx.translate(xOff, yOff);
                            ctx.rotate(this.rot);
                            ctx.rect(0, -img.height, img.width, img.height);
                            ctx.drawImage(img, 0, -img.height);
                            ctx.rotate(-this.rot);
                            ctx.translate(-xOff, -yOff);
                            var b = img.height / Math.sin(this.rot);
                            var c = img.width / Math.cos(this.rot);
                            if (b < c) {
                                xOff += b;
                                exta = (c - b) * Math.cos(this.rot) * Math.cos(this.rot);
                            }
                            else {
                                xOff += c;
                                exta = (c - b);
                            }
                            pCha = 3;
                        }
                    }
                    xOff += this.spacing.LetterSpacing;
                }
            };
            this.getWordLength = function (word) {
                if (this.recalc || word != this.currWord) {
                    this.dim = this.getWordDimensions(word);
                }
                return this.dim[0];
            };
            this.getWordHeight = function (word) {
                if (this.recalc || word != this.currWord) {
                    this.dim = this.getWordDimensions(word);
                }
                return this.dim[1];
            };
            this.getWordHeightOffset = function (word) {
                if (this.recalc || word != this.currWord) {
                    this.dim = this.getWordDimensions(word);
                }
                return this.dim[2];
            };
            this.getWordDimensions = function (word) {
                if (this.recalc || this.currWord != word) {
                    this.currWord = word;
                    this.currWordArray = this.phoneticize(word);
                    this.recalc = false;
                }
                var pCha = 0;
                var netW = 0;
                var staW = 0;
                var tail = 0;
                var uHei = 0;
                var dHei = 0;
                var exta = 0;
                var ref;
                var img;
                for (var a = 0; a < this.currWordArray.length; a++) {
                    ref = this.currWordArray[a];
                    img = this.imgs[ref];
                    if (img != undefined) {
                        if (find(ref, this.misc)) {
                            if (exta > 0) {
                                netW += exta;
                                exta = 0;
                            }
                            else if (-exta > img.width) {
                                exta += img.width;
                            }
                            else {
                                exta = 0;
                            }
                            netW += img.width;
                            if (dHei < img.height) {
                                dHei = img.height;
                            }
                            tail = 0;
                            pCha = 1;
                        }
                        else if (find(ref, this.vowels)) {
                            var dim = [img.width, img.height];
                            a++;
                            while (find(this.currWordArray[a], this.vowels)) {
                                img = this.imgs[this.currWordArray[a]];
                                dim[0] += img.width + this.spacing.LetterSpacing;
                                if (dim[1] < img.height) {
                                    dim[1] = img.height;
                                }
                                a++;
                            }
                            a--;
                            dim[0] -= this.spacing.LetterSpacing;
                            var off = dim[0] * Math.cos(this.rot);
                            var pTail = img.height * Math.sin(this.rot);
                            if (exta < 0) {
                                console.log(-exta + " < " + off);
                                if (-exta < off) {
                                    netW -= exta;
                                }
                                else {
                                    console.log("width:" + dim[0] + " exta:" + -exta + " off:" + off);
                                    if (dim[0] > -exta) {
                                        netW += off;
                                    }
                                    else {
                                        netW += dim[0] * Math.cos(this.rot) + (-exta) * Math.sin(this.rot) * Math.sin(this.rot);
                                    }
                                }
                                exta = 0;
                                tail = pTail;
                            }
                            else {
                                if (tail < pTail) {
                                    tail = pTail;
                                }
                            }
                            if (pCha == 0) {
                                netW += off;
                            }
                            else if (netW < off) {
                                staW = off - netW;
                                netW += off - netW;
                            }
                            else {
                                staW = 0;
                            }
                            var pHei = dim[0] * Math.sin(this.rot) + dim[1] * Math.cos(this.rot);
                            if (pHei > uHei) {
                                uHei = pHei;
                            }
                            pCha = 2;
                        }
                        else {
                            var b = img.height / Math.sin(this.rot);
                            var c = img.width / Math.cos(this.rot);
                            if (b < c) {
                                netW += b;
                                exta = (c - b) * Math.cos(this.rot) * Math.cos(this.rot);
                                if (tail < b + exta) {
                                    tail = exta;
                                }
                                else {
                                    tail -= b;
                                }
                            }
                            else {
                                netW += c;
                                exta = (c - b);
                                var tmp = -exta * Math.sin(this.rot) * Math.sin(this.rot);
                                if (tail < c + tmp) {
                                    tail = tmp;
                                }
                                else {
                                    tail -= c;
                                }
                            }
                            var tmpH = img.height * Math.cos(this.rot);
                            if (tmpH > uHei) {
                                uHei = tmpH;
                            }
                            tmpH = img.width * Math.sin(this.rot);
                            if (tmpH > dHei) {
                                dHei = tmpH;
                            }
                            pCha = 3;
                        }
                    }
                    netW += this.spacing.LetterSpacing;
                }
                netW -= this.spacing.LetterSpacing;
                var out = [netW + tail, uHei + dHei, uHei, staW];
                return out;
            };
            this.literal = function (word) {
                var array = [];
                var found;
                var a = 0;
                while (a < word.length) {
                    found = false;
                    switch (word[a]) {
                        case 'y':
                            array.push('ee');
                            break;
                        case 'w':
                            array.push('oo');
                            break;
                        case 'c':
                            if (!(a < word.length - 1 && word[a + 1] == 'h')) {
                                array.push('k');
                                break;
                            }
                        default:
                            for (var b = 0; b < this.chars.length; b++) {
                                test = word.indexOf(this.chars[b], a);
                                if (test == a) {
                                    array.push(this.chars[b]);
                                    a += this.chars[b].length;
                                    b = this.chars.length + 1;
                                    found = true;
                                }
                            }
                    }
                    if (!found) {
                        a++;
                    }
                }
                return array;
            };
            this.phoneticize = function (word) {
                var wordsArray = [];
                if (!phonet) {
                    wordsArray = this.literal(word);
                    return wordsArray;
                }
                for (var a = 0; a < word.length; a++) {
                    if (a < word.length - 1) {
                        var b = true;
                        switch (word[a]) {
                            case 'c':
                                switch (word[a + 1]) {
                                    case 'h':
                                        if (a > 0 && find(word[a - 1], this.vowels)) {
                                            wordsArray.push('kh');
                                            break;
                                        }
                                        wordsArray.push('ch');
                                        break;
                                    case 'o':
                                        if (a < word.length - 2 && word[a + 2] == 'u') {
                                            wordsArray.push(word[a]);
                                            wordsArray.push('ow');
                                            a++;
                                            break;
                                        }
                                    default:
                                        wordsArray.push('k');
                                        a--;
                                }
                                a++;
                                b = false;
                                break;
                            case 'o':
                                switch (word[a + 1]) {
                                    case 'o':
                                    case 'u':
                                        wordsArray.push('oo');
                                        break;
                                    case 'w':
                                        wordsArray.push('ow');
                                        break;
                                    default:
                                        if (find(word[a + 1], this.vowels) || find(word[a + 1], this.misc) || word[a + 1] == 'l') {
                                            wordsArray.push('o');
                                        }
                                        else {
                                            wordsArray.push('aw');
                                        }
                                        a--;
                                }
                                a++;
                                b = false;
                                break;
                            case 'w':
                                wordsArray.push('oo');
                                if (word[a + 1] == 'a') {
                                    wordsArray.push('o');
                                    a++;
                                }
                                b = false;
                                break;
                            case 'y':
                                switch (word[a + 1]) {
                                    case 'i':
                                        wordsArray.push('aye');
                                        a++;
                                        break;
                                    case 'o':
                                        if (a < word.length - 2 && word[a + 2] == 'u') {
                                            if (word.length == 3 || find(word[a + 3], this.misc)) {
                                                wordsArray.push('ee');
                                                wordsArray.push('oo');
                                                wordsArray.push('h');
                                                a += 2;
                                                break;
                                            }
                                        }
                                    default:
                                        wordsArray.push('ee');
                                }
                                b = false;
                                break;
                            case 'a':
                                switch (word[a + 1]) {
                                    case 'e':
                                    case 'i':
                                        wordsArray.push('ae');
                                        a++;
                                        b = false;
                                        break;
                                    case 'y':
                                        if (a < word.length - 2 && word[a + 2] == 'e') {
                                            wordsArray.push('aye');
                                            a += 2;
                                            b = false;
                                            break;
                                        }
                                        wordsArray.push('ae');
                                        a++;
                                        b = false;
                                        break;
                                    case 'w':
                                        wordsArray.push('aw');
                                        a++;
                                        b = false;
                                        break;
                                    case 's':
                                        wordsArray.push('zh');
                                        a++;
                                        b = false;
                                        break;
                                    default:
                                        if (a < word.length - 2 && word[a + 2] == 'e') {
                                            if (!(find(word[a + 1], this.vowels) || find(word[a + 1], this.misc))) {
                                                if (word[a + 1] == 'r') {
                                                    wordsArray.push('aw');
                                                }
                                                else {
                                                    wordsArray.push('ae');
                                                }
                                                b = false;
                                                break;
                                            }
                                        }
                                }
                                break;
                            case 'b':
                                if (a < word.length - 2 && word[a + 2] == 'u') {
                                    if (word[a + 1] == 'o') {
                                        wordsArray.push('b');
                                        wordsArray.push('ow');
                                        a += 2;
                                        b = false;
                                    }
                                }
                                break;
                            case 'd':
                                switch (word[a + 1]) {
                                    case 'h':
                                        wordsArray.push('dh');
                                        a++;
                                        b = false;
                                        break;
                                    case 'o':
                                        if (a < word.length - 2 && word[a + 2] == 'u') {
                                            wordsArray.push(word[a]);
                                            wordsArray.push('ow');
                                            a += 2;
                                            b = false;
                                        }
                                    default:
                                }
                                break;
                            case 'e':
                                switch (word[a + 1]) {
                                    case 'a':
                                    case 'e':
                                        wordsArray.push('ee');
                                        a++;
                                        b = false;
                                        break;
                                    default:
                                }
                                break;
                            case 'g':
                                if (word[a + 1] == 'e') {
                                    wordsArray.push('j');
                                    wordsArray.push('i');
                                    a++;
                                    b = false;
                                }
                                break;
                            case 'i':
                                if (word[a + 1] == 'e') {
                                    wordsArray.push('aye');
                                    a++;
                                    b = false;
                                }
                                else if (word[a + 1] == 'a') {
                                    wordsArray.push('ee');
                                    b = false;
                                }
                                else if (a < word.length - 2 && word[a + 2] == 'e' && !find(word[a + 3], this.vowels)) {
                                    if (!find(word[a + 1], this.vowels) && !find(word[a + 1], this.misc)) {
                                        wordsArray.push('aye');
                                        b = false;
                                    }
                                }
                                break;
                            case 'n':
                                if (a == word.length - 2 && word[a + 1] == 'g') {
                                    wordsArray.push('ng');
                                    a++;
                                    b = false;
                                }
                                break;
                            case 's':
                                if (word[a + 1] == 'h') {
                                    wordsArray.push('sh');
                                    a++;
                                    b = false;
                                }
                                break;
                            case 't':
                                if (word[a + 1] == 'h') {
                                    wordsArray.push('th');
                                    if (a < word.length - 2 && word[a + 2] == 'e') {
                                        if (word.length == 3 || find(word[a + 3], this.misc)) {
                                            wordsArray.push('u');
                                            wordsArray.push('h');
                                            a++;
                                        }
                                    }
                                    a++;
                                    b = false;
                                }
                                else if (a < word.length - 3) {
                                    if (word[a + 1] == 'i' && word[a + 2] == 'o' && word[a + 3] == 'n') {
                                        wordsArray.push('sh');
                                        wordsArray.push('u');
                                        wordsArray.push('m');
                                        a += 3;
                                        b = false;
                                    }
                                }
                                break;
                            case 'u':
                                if (a < word.length - 2) {
                                    if (!(find(word[a + 1], this.vowels) || find(word[a + 1], this.misc))) {
                                        if (find(word[a + 2], this.vowels)) {
                                            wordsArray.push('oo');
                                            b = false;
                                            break;
                                        }
                                    }
                                }
                                break;
                            default:
                        }
                        if (b) {
                            wordsArray.push(word[a]);
                        }
                    }
                    else {
                        switch (word[a]) {
                            case 'c':
                                wordsArray.push('k');
                                break;
                            case 'e':
                                if (a == 0) {
                                    wordsArray.push('e');
                                }
                                break;
                            case 'o':
                                wordsArray.push('o');
                                break;
                            case 'w':
                                wordsArray.push('oo');
                                break;
                            case 'x':
                                wordsArray.push('z');
                                break;
                            case 'i':
                                if (a == 0) {
                                    wordsArray.push('aye');
                                }
                                else {
                                    wordsArray.push('i');
                                }
                                break;
                            case 'y':
                                wordsArray.push('aye');
                                break;
                            default:
                                wordsArray.push(word[a]);
                        }
                    }
                }
                var a = 0;
                while (a < wordsArray.length) {
                    if (!find(wordsArray[a], this.misc)) {
                        while (a < wordsArray.length - 1 && wordsArray[a] == wordsArray[a + 1]) {
                            wordsArray.splice(a, 1);
                        }
                    }
                    if (this.imgs[wordsArray[a]] == undefined) {
                        wordsArray.splice(a, 1);
                    }
                    a++;
                }
                return wordsArray;
            };
        };
        this.debug = false;
    }
    draw(text, language) {
        var str = text.toLowerCase();
        switch (language) {
            case "corpus":
                oButton.style.display = "none";
                bButton.style.display = "inline";
                placeString(ctx, str, corpus);
                break;
            case "grineer":
                oButton.style.display = "none";
                bButton.style.display = "none";
                placeString(ctx, grineer.modify(str), grineer);
                break;
            case "tenno":
                oButton.style.display = "inline";
                bButton.style.display = "none";
                placeString(ctx, str, tenno);
        }
        return c;
    }
    saveImg() {
        try {
            var d = c.toDataURL("image/png");
            var w = window.open('about:blank', 'image from canvas');
            w.document.write("<img src='" + d + "' alt='from canvas'/>");
        }
        catch (error) {
            console.log("Could not save canvas.");
            alert("Could not save image:\n" + error);
        }
    }
    find(item, array) {
        for (var a = 0; a < array.length; a++) {
            if (item == array[a]) {
                return true;
            }
        }
        return false;
    }
    placeString(ctx, string, lanClass) {
        var txt = new Paragraph(string, lanClass);
        resize();
        c.width = Math.ceil(txt.w);
        c.height = Math.ceil(txt.h);
        var xOff = 0;
        var yOff = 0;
        ctx.fillStyle = "white";
        ctx.rect(0, 0, txt.w, txt.h);
        if (background == true) {
            ctx.fill();
        }
        for (var a = 0; a < txt.lines.length; a++) {
            var line = txt.lines[a];
            var initOff = 0;
            if (lanClass.centered) {
                initOff = (c.width - line.w) / 2;
            }
            ctx.translate(initOff, 0);
            ctx.rect(xOff, yOff + line.yIM, line.w, 0);
            ctx.rect(xOff, yOff, line.w, line.h);
            for (var b = 0; b < line.words.length; b++) {
                var word = line.words[b];
                var hOff = line.yIM - word.yI;
                ctx.translate(xOff, yOff + hOff);
                ctx.rect(0, 0, word.w, word.h);
                lanClass.placeWord(ctx, word.str);
                ctx.translate(-xOff, -(yOff + hOff));
                xOff += word.w + lanClass.spacing.SpaceWidth;
            }
            ctx.translate(-initOff, 0);
            yOff += line.h + lanClass.spacing.LineHeight;
            xOff = 0;
        }
        if (debug) {
            ctx.stroke();
        }
    }
    Word(str, w, h, yI) {
        this.str = str;
        this.w = w;
        this.h = h;
        this.yI = yI;
    }
    Line(str, lanClass) {
        var array = str.split(' ');
        this.words = [];
        this.w = 0;
        this.h = 0;
        this.yIM = 0;
        for (var a = 0; a < array.length; a++) {
            this.words[a] = new Word(array[a], lanClass.getWordLength(array[a]), lanClass.getWordHeight(array[a]), lanClass.getWordHeightOffset(array[a]));
            this.w += this.words[a].w + lanClass.spacing.SpaceWidth;
            if (this.words[a].yI > this.yIM) {
                this.yIM = this.words[a].yI;
            }
        }
        this.w -= lanClass.spacing.SpaceWidth;
        for (var a = 0; a < this.words.length; a++) {
            var pH = this.words[a].h + (this.yIM - this.words[a].yI);
            if (pH > this.h) {
                this.h = pH;
            }
        }
    }
    Paragraph(str, lanClass) {
        var array = str.split('\n');
        this.lines = [];
        this.w = 0;
        this.h = 0;
        for (var a = 0; a < array.length; a++) {
            this.lines[a] = new Line(array[a], lanClass);
            if (this.lines[a].w > this.w) {
                this.w = this.lines[a].w;
            }
            this.h += this.lines[a].h + lanClass.spacing.LineHeight;
        }
        this.h -= lanClass.spacing.LineHeight;
    }
}
exports.default = TennoTyper;
//# sourceMappingURL=index.js.map