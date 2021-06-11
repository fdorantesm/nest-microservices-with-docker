import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  public async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Post('/auth/login')
  public async login(
    @Body() auth: { username: string; password: string },
  ): Promise<{ token: string }> {
    const { username, password } = auth;
    const token = await this.client
      .send('do_login', { username, password })
      .toPromise();

    return { token };
  }
}
