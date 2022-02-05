import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiHeader({
  name: 'x-app-key',
  description: 'this a monetize route you have to set x-app-key in headers',
  required: true,
})
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'get all categories that fetch from divar!',
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiNotFoundResponse({
    description: 'only existed category ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'get a category with an ID that fetch from divar!',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
}
