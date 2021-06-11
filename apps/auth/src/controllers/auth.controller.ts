import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('do_login')
  public login(payload: {
    username: string;
    password: string;
  }): Promise<string> {
    return this.authService.login(payload);
  }
}
