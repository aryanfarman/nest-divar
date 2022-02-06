import { Injectable } from '@nestjs/common';
import { UtilityService } from '../utility/utility.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly utilityService: UtilityService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      return undefined;
    }
    if (await this.utilityService.compare(password, user.password)) {
      return user;
    }
    return undefined;
  }
}
