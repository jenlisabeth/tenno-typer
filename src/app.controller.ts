import { Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { Canvas } from 'canvas';
import TennoTyper from './tenno-typer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:text/:language')
  getTennoImage(@Param('text') text: string, @Param('language') language: string) {
    var tenno_typer = new TennoTyper();
    return tenno_typer.draw(text, language);
  }
}
