import { Image, CanvasRenderingContext2D } from 'canvas';
import { Language } from "./language";
import { TennoTyper } from "./tenno-typer";

export class Corpus extends Language {
	constructor() {
		super();
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
		this.bold_imgs = [];
		this.alphabet = 'abcdefghijklmnoprstuvwyz'.split('');
		this.numbers = '01'.split('');
		this.chars = [...this.alphabet, ...this.numbers];
		this.get_images();
	}
	get_images() {
		for (var char of this.chars) { // gets images and puts them in imgs table
			this.imgs[char] = new Image();
			this.imgs[char].src = this.folder + this.pre + char + this.ext;
			this.bold_imgs[char] = new Image();
			this.bold_imgs[char].src = this.folder + 'b' + this.pre + char + this.ext;
		}
		console.log("Corpus images loaded.");
	}
	placeWord(ctx: CanvasRenderingContext2D, word: string) { // place left aligned images
		console.log("Placing Corpus word for: " + word);
		var offset = 0;
		var imgs = this.imgs;
		if (TennoTyper.boldify) {
			imgs = this.bold_imgs;
		}
		for (var letter of word) {
			var img = imgs[letter];
			if (img != undefined) {
				ctx.rect(offset, 0, img.width, img.height);
				ctx.drawImage(img, offset, 0);
				offset += (img.width + this.spacing.LetterSpacing);
			}
		}
	}
	getWordLength(word: string): number {
		var len = 0;
		var imgs = this.imgs;
		if (TennoTyper.boldify) {
			imgs = this.bold_imgs;
		}
		for (var letter of word) {
			var img = imgs[letter];
			if (img != undefined) {
				len += (img.width + this.spacing.LetterSpacing);
			}
		}
		return (len - this.spacing.LetterSpacing);
	}
	getWordHeight(word: string): number {
		var height = 0;
		var imgs = this.imgs;
		if (TennoTyper.boldify) {
			imgs = this.bold_imgs;
		}
		for (var letter of word) {
			var img = imgs[letter];
			if (img != undefined && img.height > height) {
				height = img.height;
			}
		}
		return height;
	}
}