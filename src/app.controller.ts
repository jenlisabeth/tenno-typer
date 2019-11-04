import { Controller, Get, Param } from '@nestjs/common';
import { TennoTyper } from './tenno-typer';
import { loadImage, createCanvas } from 'canvas';

@Controller()
export class AppController {
  tenno_typer: TennoTyper;

  constructor() {
    this.tenno_typer = new TennoTyper();
  }

  @Get('/:language/keys')
  async getLanguageKey(@Param('language') language: string) {
    const canvas = createCanvas(1000, 714)
    const ctx = canvas.getContext('2d')
    var img = await loadImage('./images/keys/' + language.toLowerCase() + '.png');
    ctx.drawImage(img, 0, 0, 1000, 714);
    return "<img src='" + canvas.toDataURL() + "' alt='Language Key.'/>";
  }

  @Get('/:text/:language')
  getTennoImage(@Param('text') text: string, @Param('language') language: string) {
    return this.tenno_typer.draw(text, language);
  }

}
