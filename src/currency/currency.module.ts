import { DynamicModule, Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CURRENCY_SIGN } from './constants/token.constant';

@Module({})
export class CurrencyModule {
  static register(fullOption: boolean): DynamicModule {
    return {
      module: CurrencyModule,
      imports: [],
      providers: [
        CurrencyService,
        {
          provide: CURRENCY_SIGN,
          useFactory: async (currencyService: CurrencyService) => {
            return currencyService.getCurrencySign(
              process.env.CURRENCY,
              fullOption,
            );
          },
          inject: [CurrencyService],
        },
      ],
      exports: [CURRENCY_SIGN],
    };
  }
}
