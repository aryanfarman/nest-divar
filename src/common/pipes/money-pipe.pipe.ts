import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateScheduledNotifyDto } from '../../scheduled-notify/dto/create-scheduled-notify.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoneyPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  transform(value: CreateScheduledNotifyDto, metadata: ArgumentMetadata) {
    let target: string = value.price;
    const currency = ['$', '€', 'ریال'];
    let i = currency.length;
    let isAccepted = false;
    target = target.replace(/,/g, '');
    while (!isAccepted && i > -1) {
      if (target.endsWith(currency[i])) {
        isAccepted = true;
        if (currency[i] == 'ریال')
          target = target.replace(`0${currency[i]}`, '');
        else {
          target = target.replace(currency[i], '');
          const changeCurrency =
            +target * this.configService.get(`CURRENCY_VALUE`);
          target = `${changeCurrency}`;
        }
      }
      i--;
    }
    value.price = target;
    return value;
  }
}
