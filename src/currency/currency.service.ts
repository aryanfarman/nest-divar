import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  getCurrencySign(currency: string, fullOption: boolean) {
    switch (currency) {
      case 'euro':
        return fullOption ? '€ ' + currency : '€';
      case 'dollar':
        return fullOption ? '$ ' + currency : '$';
      case 'rial':
        return '﷼';
      default:
        return 'تومان';
    }
  }
}
