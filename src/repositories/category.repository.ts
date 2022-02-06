import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../post/entities/category.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async preloadCategoryByName(name: string): Promise<Category> {
    const existingCategory = await this.findOne({ name });
    if (existingCategory) {
      return existingCategory;
    }
    throw new NotFoundException('this category does not valid');
  }
}
