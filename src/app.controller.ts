import { Controller, Get, Param } from '@nestjs/common';
import { TennoTyper } from './tenno-typer';

@Controller()
export class AppController {
  tenno_typer: TennoTyper;

  constructor() {
    this.tenno_typer = new TennoTyper();
  }

  @Get('/:text/:language')
  getTennoImage(@Param('text') text: string, @Param('language') language: string) {
    return this.tenno_typer.draw(text, language);
  }
}
