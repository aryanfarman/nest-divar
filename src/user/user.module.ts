import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostModule } from '../post/post.module';
import { LoggerModule } from '../logger/logger.module';
import { ConsoleColorEnum } from '../enum/console-color.enum';
import { UtilityModule } from '../utility/utility.module';
import { AuthModule } from '../auth/auth.module';
import { PostRepository } from '../repositories/post.repository';
import { CategoryRepository } from '../repositories/category.repository';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, PostRepository, CategoryRepository]),
    LoggerModule.register('user', ConsoleColorEnum.RED),
    PostModule,
    UtilityModule,
    AuthModule,
  ],
  exports: [UserService],
})
export class UserModule {}
