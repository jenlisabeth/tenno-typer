import { createCanvas, CanvasRenderingContext2D, Canvas } from 'canvas';
import { Grineer } from './grineer';
import { Corpus } from './corpus';
import { Orokin } from './orokin';
import { Paragraph, Language } from './language';
const grineer = new Grineer();
const corpus = new Corpus();
const orokin = new Orokin();

export class TennoTyper {
    c: Canvas;
    ctx: CanvasRenderingContext2D;
    static background: boolean;
	static phonet: boolean;
	static boldify: boolean;
	languages = ["orokin", "corpus", "grineer"];
	
	constructor(background = false, phonet = true, boldify = false){
		TennoTyper.background = background;
		TennoTyper.phonet = phonet;
		TennoTyper.boldify = boldify;
		this.c = createCanvas(200, 200);
		this.ctx = this.c.getContext('2d');
	}

    draw(text: string, language: string) {
		const str = text.toLowerCase();
		switch (language) {
			case "corpus":
				this.placeString(str, corpus);
				break;
			case "grineer":
				this.placeString(grineer.modify(str), grineer);
				break;
			case "orokin":
				this.placeString(str, orokin);
		}
		try {
			return "<img src='" + this.c.toDataURL() + "' alt='from canvas'/>";
		} catch (err) {
			console.log("Could not save image:\n" + err)
		}
	}
    
    /*
		isolate each word
		calculate required canvas size, and draw
		call required drawing functions
	*/
	placeString(string: string, lanClass: Language) {
        const txt = new Paragraph(string, lanClass);

		this.c.width = Math.ceil(txt.w);
		this.c.height = Math.ceil(txt.h);

		var xOff = 0;
		var yOff = 0;

		this.ctx.fillStyle = "white";
		this.ctx.rect(0, 0, txt.w, txt.h);
		for (var a = 0; a < txt.lines.length; a++) { // for each line
			var line = txt.lines[a];

			var initOff = 0; // left aligned or centered
			if (lanClass.centered) {
				initOff = (this.c.width - line.w) / 2;
			}
			this.ctx.translate(initOff, 0);
			this.ctx.rect(xOff, yOff + line.yIM, line.w, 0); // show drawline
			this.ctx.rect(xOff, yOff, line.w, line.h);

			for (var b = 0; b < line.words.length; b++) { // for each word
				var word = line.words[b];
				var hOff = line.yIM - word.yI

				this.ctx.translate(xOff, yOff + hOff);
				this.ctx.rect(0, 0, word.w, word.h);
				lanClass.placeWord(this.ctx, word.str);
				this.ctx.translate(-xOff, -(yOff + hOff));

				xOff += word.w + lanClass.spacing.SpaceWidth;
			}

			this.ctx.translate(-initOff, 0);

			yOff += line.h + lanClass.spacing.LineHeight;
			xOff = 0;
		}
	}
}