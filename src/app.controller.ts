import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('start')
  start(@Query() { browser, url }): unknown {
    return this.appService.start(url, browser);
  }

  @Get('stop')
  stop(@Query() { browser }): unknown {
    return this.appService.stop(browser);
  }

  @Get('cleanup')
  cleanup(@Query() { browser }): unknown {
    return this.appService.cleanup(browser);
  }
}
