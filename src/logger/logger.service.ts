import { Injectable, Scope } from '@nestjs/common';
import * as chalk from 'chalk';
import { ConsoleColorEnum } from '../enum/console-color.enum';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private prefix;
  private color;

  async set(prefix: string, color: ConsoleColorEnum) {
    this.prefix = prefix;
    this.color = color;
    return (message) => {
      this.log(message);
    };
  }

  log(message: string) {
    switch (this.color) {
      case 'blue':
        console.log(chalk.blue(`[${this.prefix}]`, message));
        break;
      case 'red':
        console.log(chalk.red(`[${this.prefix}]`, message));
        break;
      case 'yellow':
        console.log(chalk.yellow(`[${this.prefix}]`, message));
        break;
      case 'green':
        console.log(chalk.green(`[${this.prefix}]`, message));
        break;
      case 'black':
        console.log(chalk.black(`[${this.prefix}]`, message));
        break;
      default:
        console.log(chalk.whiteBright(`[${this.prefix}]`, message));
        break;
    }
  }
}
