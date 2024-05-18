import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('/')
  @Redirect('/api')
  getRoot() {}
}

export default AppController;
