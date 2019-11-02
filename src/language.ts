import { Image, CanvasRenderingContext2D } from 'canvas';

export class Language{
    folder: string;
	pre: string;
	ext: string;
    centered: boolean;
    recalc: boolean;
	spacing = {
        LineHeight: 0,
        SpaceWidth: 0,
        LetterSpacing: 0,
    };
    imgs: Image[];
    bold_imgs: Image[];
    alphabet: string[];
    numbers: string[];
    vowels: string[];
    consonants: string[];
    special_chars: string[];
    chars: string[];
    constructor() {}
    find(item: any, array: any[]){
        for (var a = 0; a < array.length; a++) {
            if (item == array[a]) {
                return true;
            }
        }
        return false;
	}
	placeWord(ctx: CanvasRenderingContext2D, str: string){}
	getWordLength(word: string):number{return 0;}
	getWordHeight(word: string):number{return 0;}
	getWordHeightOffset(word: string):number{return 0;}
}

export class Word{ // basic word class
	str: string;
    w: number;
    h: number;
    yI: number; // individual y initial offset
	constructor (str: string, w: number, h: number, yI: number){
    	this.str = str;
    	this.w = w;
    	this.h = h;
    	this.yI = yI;
	}
}

export class Line{
	words: Word[];
	w: number;
	h: number;
	yIM: number; // line l initial offset maximum
	constructor(str: string, lanClass: Language){
		const array = str.split(' '); // make array of words for each line
		this.words = []
		this.w = 0;
		this.h = 0;
		this.yIM = 0;
	    // instanciate words array and line width/height
	    for (var a = 0; a < array.length; a++) {
	        this.words[a] = new Word(array[a], lanClass.getWordLength(array[a]), lanClass.getWordHeight(array[a]), lanClass.getWordHeightOffset(array[a]));
	        this.w += this.words[a].w + lanClass.spacing.SpaceWidth;

	        if (this.words[a].yI > this.yIM) { // find max offset
	            this.yIM = this.words[a].yI;
	        }
	    }
	    this.w -= lanClass.spacing.SpaceWidth; // deal with extra width spacing

	    for (var a = 0; a < this.words.length; a++) { // update line height
	        var pH = this.words[a].h + (this.yIM - this.words[a].yI);
	        if (pH > this.h) {
	            this.h = pH;
	        }
	    }
	}
}

export class Paragraph{
	lines: Line[];
	w: number;
	h: number;
	constructor(str: string, lanClass: Language) {
		const array = str.split('\n'); // make array of lines for the paragraph
		this.lines = []
		this.w = 0;
		this.h = 0;
	    //instansiate lines array and canvas width and height
	    for (var a = 0; a < array.length; a++) {
	        this.lines[a] = new Line(array[a], lanClass);
	        if (this.lines[a].w > this.w) {
	            this.w = this.lines[a].w;
	        }
	        this.h += this.lines[a].h + lanClass.spacing.LineHeight;
	    }
	    this.h -= lanClass.spacing.LineHeight; // deal with extra height spacing
	}
}