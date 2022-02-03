import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { EventTypeEnum } from '../event/entities/event.entity';
import { IsPublic } from '../common/guards/isPublic-decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @IsPublic()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.postService.findAll(paginationQuery);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Patch(':id/event/:type/:userId')
  like(
    @Param('id') id,
    @Param('userId') userId,
    @Param('type') type: EventTypeEnum,
  ) {
    return this.postService.event(+id, type, +userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
