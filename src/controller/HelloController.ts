import { Controller, Get } from '@nestjs/common';
import { HelloService, Hello } from '../service/HelloService';

@Controller()
export class HelloController {
  constructor(private readonly appService: HelloService) {}

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/hello-json")
  getHelloJson(): Hello {
    return this.appService.getHelloJson();
  }
}