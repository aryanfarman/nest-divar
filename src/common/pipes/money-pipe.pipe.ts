import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MoneyPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const currency = ['$', '€', 'ریال'];
    let i = currency.length;
    let isAccepted = false;
    while (!isAccepted || i == 0) {
      if (value.endsWith(currency[i])) {
        isAccepted = true;
        value = value.replace(currency[i], '');
      }
      i--;
    }

    value = value.replace(/,/g, '');

    return value;
  }
}
