import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {

  getHello(): string {
    return 'Hello World!';
  }
  getHelloJson(): Hello {
    return {text: "Hello World"}
  }
}

export interface Hello {
  text: string
}

