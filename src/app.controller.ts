import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/// <reference path="./TennoTyper/index.d.ts" />
import TennoTyper from './TennoTyper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTennoImage(text: string, language: string): HTMLCanvasElement {
    return TennoTyper.draw(text, language);
  }
}
