import { Injectable, Scope } from '@nestjs/common';
import chalk from 'chalk';
import { ConsoleColorEnum } from '../enum/console-color.enum';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private prefix: string;
  private color: ConsoleColorEnum;

  set(prefix: string, color?: ConsoleColorEnum) {
    this.prefix = prefix;
    this.color = color;
  }

  log(message: string) {
    switch (this.color) {
      case 'blue':
        console.log(chalk.blue(`[${this.prefix}] `, message));
        break;
      case 'red':
        console.log(chalk.red(`[${this.prefix}] `, message));
        break;
      case 'yellow':
        console.log(chalk.yellow(`[${this.prefix}] `, message));
        break;
      case 'green':
        console.log(chalk.green(`[${this.prefix}] `, message));
        break;
      case 'black':
        console.log(chalk.black(`[${this.prefix}] `, message));
        break;
      default:
        console.log(`[${this.prefix}] `, message);
        break;
    }
  }
}
