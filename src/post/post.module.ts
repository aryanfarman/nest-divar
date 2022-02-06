import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Category } from './entities/category.entity';
import { EventEntity } from '../event/entities/event.entity';
import { UtilityModule } from '../utility/utility.module';
import { CurrencyModule } from '../currency/currency.module';
import { LoggerModule } from '../logger/logger.module';
import { ConsoleColorEnum } from '../enum/console-color.enum';
import { UtilityService } from '../utility/utility.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { LoggerService } from '../logger/logger.service';
import { UserRepository } from '../repositories/user.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { EventRepository } from '../event/event.repository';

@Module({
  controllers: [PostController, CategoryController],
  providers: [
    PostService,
    CategoryService,
    {
      provide: 'categories',
      useFactory: (
        utilityService: UtilityService,
        categoryService: CategoryService,
        loggerService: LoggerService,
      ) => {
        const brands = utilityService.loadCategories();
        brands.subscribe(async (value) => {
          await categoryService.create(value);
          const log = await loggerService.set(
            'Database',
            ConsoleColorEnum.BLUE,
          );
          log('fetching categories data from divar done!');
        });
      },
      inject: [UtilityService, CategoryService, LoggerService],
    },
  ],
  imports: [
    CurrencyModule.register(true),
    UtilityModule,
    TypeOrmModule.forFeature([
      Post,
      Category,
      EventEntity,
      UserRepository,
      CategoryRepository,
      EventRepository,
    ]),
    LoggerModule.register('post', ConsoleColorEnum.BLUE),
    LoggerModule.register('database', ConsoleColorEnum.RED),
  ],
  exports: [PostService, CategoryService],
})
export class PostModule {}
