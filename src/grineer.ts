import { Image, CanvasRenderingContext2D } from 'canvas';
import { Language } from './language';

export class Grineer extends Language {
    constructor() {
        super();
        this.folder = './images/grineer/';
        this.pre = 'g';
        this.ext = ".png";
        this.centered = false;
        this.spacing = {
            LineHeight: 15,
            SpaceWidth: 25,
            LetterSpacing: 5,
        };
        this.imgs = [];
        this.alphabet = 'abcdefghijklmnoprstuvwyz'.split('');
        this.numbers = '0123456789'.split('');
        this.special_chars = ["Question", "Period", "Comma", "Hash", "At"];
        this.chars = [...this.alphabet, ...this.numbers, ...this.special_chars];
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
                case 'Hash':
                    this.imgs['#'] = new Image();
                    this.imgs['#'].src = this.folder + this.pre + char + this.ext;
                    break;
                case 'At':
                    this.imgs['@'] = new Image();
                    this.imgs['@'].src = this.folder + this.pre + char + this.ext;
                    break;
                default:
                    this.imgs[char] = new Image();
                    this.imgs[char].src = this.folder + this.pre + char + this.ext;
            }
        }
        console.log("Grineer images loaded.");
    }
    placeWord(ctx: CanvasRenderingContext2D, word: string) { // place left aligned images
        console.log("Placing Grineer word for: " + word);
        var offset = 0;
        for (var letter of word) {
            var img = this.imgs[letter];
            if (img != undefined) {
                ctx.rect(offset, 0, img.width, img.height);
                ctx.drawImage(img, offset, 0);
                offset += (img.width + this.spacing.LetterSpacing);
            }
        }
    }
    getWordLength(word: string): number {
        var len = 0;
        for (var letter of word) {
            var img = this.imgs[letter];
            if (img != undefined) {
                len += (img.width + this.spacing.LetterSpacing);
            }
        }
        return (len - this.spacing.LetterSpacing);
    }
    getWordHeight(word: string): number {
        var height = 0;
        for (var letter of word) {
            var img = this.imgs[letter];
            if (img != undefined && img.height > height) {
                height = img.height;
            }
        }
        return height;
    }
    modify(str: string): string {
        str = str.replace(/qu/g, "kw");
        str = str.replace(/q/g, "kw");
        str = str.replace(/x/g, "ks");
        return str;
    }
}