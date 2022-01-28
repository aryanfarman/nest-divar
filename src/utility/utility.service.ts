import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  getCurrencySign(currency: string, fullOption: boolean) {
    switch (currency) {
      case 'euro':
        return fullOption ? currency + '€' : '€';
      case 'dollar':
        return fullOption ? currency + '$' : '$';
      case 'rial':
        return fullOption ? currency + '﷼' : '﷼';
      default:
        return fullOption ? currency + 'تومان' : 'تومان';
    }
  }
}
