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
import { LoggerModule } from '../logger/logger.module';
import { ConsoleColorEnum } from '../enum/console-color.enum';
import { UtilityService } from '../utility/utility.service';
import { CategoryService } from './category.service';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    CategoryService,
    {
      provide: 'categories',
      useFactory: (
        utilityService: UtilityService,
        categoryService: CategoryService,
      ) => {
        const brands = utilityService.loadCategories();
        brands.subscribe(async (value) => {
          await categoryService.create(value);
          console.log('fetching categories data from divar done!');
        });
      },
      inject: [UtilityService, CategoryService],
    },
  ],
  imports: [
    CurrencyModule.register(true),
    EventModule,
    UtilityModule,
    TypeOrmModule.forFeature([Post, Category, EventEntity, User]),
    LoggerModule.register('post', ConsoleColorEnum.BLUE),
  ],
  exports: [PostService],
})
export class PostModule {}
