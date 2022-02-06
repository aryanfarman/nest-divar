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
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiHeader({
    name: 'x-app-key',
    description: 'this a monetize route you have to set x-app-key in headers',
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'only existed categories are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'this insert a post in app with only valid categories',
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({
    description:
      'this route will return all internal posts on app\n its public route',
  })
  @IsPublic()
  @Get()
  findAll(@Query() paginationQuery?: PaginationQueryDto) {
    return this.postService.findAll(paginationQuery);
  }

  @ApiOperation({
    description:
      'this route will return an internal post on app\n its public route',
  })
  @ApiParam({
    name: 'id',
  })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @ApiHeader({
    name: 'x-app-key',
    description: 'this a monetize route you have to set x-app-key in headers',
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'only existed user ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description:
      'this update a internal post in app with only valid categories',
  })
  @ApiParam({
    name: 'id',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiHeader({
    name: 'x-app-key',
    description: 'this a monetize route you have to set x-app-key in headers',
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'only existed user ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description:
      'this update a internal post in app with only valid categories',
  })
  @ApiParam({
    name: 'id',
  })
  @Patch(':id')
  patch(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiNotFoundResponse({
    description: 'only existed posts and users are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'each user can like each post only once',
  })
  @ApiOperation({
    description: 'an existed user can like an existed post',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiParam({
    name: 'userId',
  })
  @IsPublic()
  @Patch(':id/event/:type/:userId')
  like(
    @Param('id') id,
    @Param('userId') userId,
    @Param('type') type: EventTypeEnum,
  ) {
    return this.postService.event(+id, type, +userId);
  }

  @ApiHeader({
    name: 'x-app-key',
    description: 'this a monetize route you have to set x-app-key in headers',
    required: true,
  })
  @ApiNotFoundResponse({
    description: 'only existed user ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'this delete a internal post in app',
  })
  @ApiParam({
    name: 'id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
