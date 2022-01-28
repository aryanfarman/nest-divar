import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Category } from './entities/category.entity';
import { EventEntity } from '../event/entities/event.entity';
import { EventModule } from '../event/event.module';
import { User } from '../user/entities/user.entity';
import { UtilityModule } from '../utility/utility.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    CurrencyModule.register(true),
    EventModule,
    UtilityModule,
    TypeOrmModule.forFeature([Post, Category, EventEntity, User]),
  ],
  exports: [PostService],
})
export class PostModule {}
