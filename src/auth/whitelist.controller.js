import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/whitelist')
export class WhitelistController {
  @Get('all')
  getAll() {
    return [
      '/usuarios/api/v1/auth/login'
    ];
  }
}
