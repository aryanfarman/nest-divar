import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByUsername(username: string) {
    return this.findOne({ username });
  }

  findById(id: number) {
    return this.findOne({ id });
  }
}
