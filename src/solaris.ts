import { Image, CanvasRenderingContext2D } from 'canvas';
import { Language } from './language';
import { TennoTyper } from './tenno-typer';

export class Solaris extends Language {
	currWord: string;
	dim: number[];
    currWordArray: string[];
    constructor() {
        super();
        this.folder = './images/solaris/';
        this.pre = 's';
        this.ext = ".png";
        this.centered = false;
        this.spacing = {
            LineHeight: 15,
            SpaceWidth: 25,
            LetterSpacing: 5,
        };
        this.currWordArray = [];
		this.dim = [0, 0]; // array with: Width, height
        this.imgs = [];
        this.vowels = ['aa', 'ah', 'aw', 'alw', 'ee', 'eh', 'ii', 'ih', 'oh', 'oo', 'uu', 'uh', '-h'];
		this.consonants = ['b', 'ch', 'dd', 'dth', 'f', 'g', 'h', 'j', 'kk', 'kh', 'l', 'm', 'nn', 'ng', 'p', 'r', 'ss', 'sh', 'tt', 'th', 'v', 'zz', 'zh'];
        this.numbers = '01'.split('');
        this.special_chars = ["Apostrophe", "Colon", "Comma", "Exclamation", "Period", "Question"];
        this.chars = [...this.vowels, ...this.consonants, ...this.numbers, ...this.special_chars];
        this.get_images();
    }
    get_images() {
        for (var char of this.chars) { // gets images and puts them in imgs table
            switch (char) {
                case 'Question':
                    this.imgs['?'] = new Image();
                    this.imgs['?'].src = this.folder + this.pre + char + this.ext;
                    break;
                case 'Comma':
                    this.imgs[','] = new Image();
                    this.imgs[','].src = this.folder + this.pre + char + this.ext;
                    break;
                case 'Period':
                    this.imgs['.'] = new Image();
                    this.imgs['.'].src = this.folder + this.pre + char + this.ext;
                    break;
                case 'Apostrophe':
                    this.imgs['Apostrophe'] = new Image();
                    this.imgs['Apostrophe'].src = this.folder + this.pre + char + this.ext;
                    break;
                case 'Colon':
                    this.imgs['-'] = new Image();
                    this.imgs['-'].src = this.folder + this.pre + char + this.ext;
                    break;
                case 'Exclamation':
                    this.imgs['!'] = new Image();
                    this.imgs['!'].src = this.folder + this.pre + char + this.ext;
                    break;
                default:
                    this.imgs[char] = new Image();
                    this.imgs[char].src = this.folder + this.pre + char + this.ext;
            }
        }
        console.log("Solaris images loaded.");
    }
    placeWord(ctx: CanvasRenderingContext2D, word: string) { // place left aligned images
        var offset = 0;
        if (this.recalc || this.currWord != word) {
			this.currWord = word;
			this.currWordArray = this.literal(word); // todo: edit line to phonetization once that is done
			this.dim = this.getWordDimensions(word);
			this.recalc = false;
		}
        for (var a = 0; a < this.currWordArray.length; a++) {
            var ref = this.currWordArray[a];
			var img = this.imgs[ref];
            if (img != undefined) {
                ctx.rect(offset, 0, img.width, img.height);
                ctx.drawImage(img, offset, 0);
                offset += (img.width + this.spacing.LetterSpacing);
            }
        }
    }
    getWordLength(word: string): number {
        if (this.recalc || word != this.currWord) {// so I dont have to phoneticize several times on same word
			this.dim = this.getWordDimensions(word);
		}
		return this.dim[0];
    }
    getWordHeight(word: string): number {
        if (this.recalc || word != this.currWord) {// so I dont have to phoneticize several times on same word
			this.dim = this.getWordDimensions(word);
		}
		return this.dim[1];
    }
    getWordDimensions(word:string): number[] {
        if (this.recalc || this.currWord != word) {
			this.currWord = word;
			this.currWordArray = this.literal(word); // todo: edit line to phonetization once that is done
			this.recalc = false;
        }
        var W = 0; // width start at 0
		var H = 0; // height start at 0
        for (var a = 0; a < this.currWordArray.length; a++) {
            var ref = this.currWordArray[a];
            var img = this.imgs[ref];
            if (img != undefined) {
                W += (img.width + this.spacing.LetterSpacing);
                if (img.height > H) {
                    H = img.height;
                }
			}
        }
        var out = [W, H];
		return out;
    }
    literal(word: string): string[] {
		var array = [];
		var a = 0;
		while (a < word.length) {
			var found = false;
			switch (word[a]) {
                case '\'':
                    array.push('Apostrophe');
                    break;
				case 'y':
					array.push('ee');
					break;
				case 'w':
					array.push('oo');
					break;
                case 'e':
                    if (!(word[a + 1] == 'h')) {
                        array.push('ee');
                        console.log("E was single so we pushed.")
                        break;
                    }
                    console.log("E was not single, let's check if it is valid.")
                case 'i':
                    if (!(word[a + 1] == 'h')) {
                        array.push('ii');
                        console.log("I was single so we pushed.")
                        break;
                    }
                    console.log("I was not single, let's check if it is valid.")
                case 'o':
                    if (!(word[a + 1] == 'h')) {
                        array.push('oo');
                        console.log("O was single so we pushed.")
                        break;
                    }
                    console.log("O was not single, let's check if it is valid.")
                case 'u':
                    if (!(word[a + 1] == 'h')) {
                        array.push('uu');
                        console.log("U was single so we pushed.")
                        break;
                    }
                    console.log("U was not single, let's check if it is valid.")
                case 'k':
                    if (!(word[a + 1] == 'h')) {
                        array.push('kk');
                        console.log("K was single so we pushed.")
                        break;
                    }
                    console.log("K was not single, let's check if it is valid.")
                case 's':
                    if (!(word[a + 1] == 'h')) {
                        array.push('ss');
                        console.log("S was single so we pushed.")
                        break;
                    }
                    console.log("S was not single, let's check if it is valid.")
                case 't':
                    if (!(word[a + 1] == 'h')) {
                        array.push('tt');
                        console.log("T was single so we pushed.")
                        break;
                    }
                    console.log("T was not single, let's check if it is valid.")
                case 'z':
                    if (!(word[a + 1] == 'h')) {
                        array.push('zz');
                        console.log("Z was single so we pushed.")
                        break;
                    }
                    console.log("Z was not single, let's check if it is valid.")
                case 'a':
                    var checkers = ['h', 'w']
                    if (!(checkers.indexOf(word[a + 1]) > -1)) {
                        if (word[a + 1] != 'l' || word[a + 1] == 'l' && word[a + 2] != 'w') {
                            array.push('aa');
                            console.log("A was single so we pushed.")
                            break;
                        }
                    }
                    console.log("A was not single, let's check if it is valid.")
                case 'n':
                    if (word[a] == 'n') {
                        if (!(word[a + 1] == 'g')) {
                            array.push('nn');
                            console.log("N was single so we pushed.")
                            break;
                        }
                    }
                    console.log("N was not single, let's check if it is valid.")
                case 'd':
                    if (word[a] == 'd') {
                        if (word[a + 1] != 't' || word[a + 1] == 't' && word[a + 2] != 'h') {
                            array.push('dd');
                            console.log("D was single so we pushed.")
                            break;
                        }
                    }
                    console.log("D was not single, let's check if it is valid.")
				default:
					for (var b = 0; b < this.chars.length; b++) {
						var test: number = word.indexOf(this.chars[b], a);
						if (test == a) {
							array.push(this.chars[b]);
							a += this.chars[b].length;
							b = this.chars.length + 1;
                            found = true;
                            break;
						}
					}
			}
			if (!found) {
				a++;
			}
		}
		return array;
	}
    phoneticize(word: string): string[] { // return array of phoneticized chars, according to phoneticizeGuide.txt
		var wordsArray = [];
		if (!TennoTyper.phonet) {
			wordsArray = this.literal(word);
			return wordsArray;
		}
		//todo: write phonetization for Solaris  
	}
}