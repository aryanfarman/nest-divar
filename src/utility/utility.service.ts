import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import cheerio from 'cheerio';
import { catchError, map, throwError } from 'rxjs';
import { CannotExecuteNotConnectedError } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilityService {
  constructor(private readonly httpService: HttpService) {}

  loadCategories() {
    const brands = [];
    return this.httpService.get('https://divar.ir/s/mashhad/car').pipe(
      map((value) => {
        const $ = cheerio.load(value.data);
        const data = $('.kt-internal-link-list__item-content');
        const datas = Array.from($(data));
        const hrefs: Array<string> = [];
        datas.forEach((item, i) => {
          hrefs.push(data[`${i}`].attribs.href);
        });

        hrefs.forEach((item, i) => {
          brands.push({
            id: i + 1,
            name: item.substr(15),
          });
        });
        return brands;
      }),
      catchError((err) => {
        return throwError(() => new CannotExecuteNotConnectedError(err));
      }),
    );
  }

  hash(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  confirmPasswords(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }
}
