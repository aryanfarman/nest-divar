import { Injectable } from '@nestjs/common';
import { UtilityService } from '../utility/utility.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly utilityService: UtilityService,
    private readonly userRepository: UserRepository,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return undefined;
    }
    if (await this.utilityService.compare(password, user.password)) {
      return user;
    }
    return undefined;
  }
}
