import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { PostModule } from '../post/post.module';
import { LoggerModule } from '../logger/logger.module';
import { ConsoleColorEnum } from '../enum/console-color.enum';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    LoggerModule.register('user', ConsoleColorEnum.RED),
    PostModule,
  ],
  exports: [],
})
export class UserModule {}
