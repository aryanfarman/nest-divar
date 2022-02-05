import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreatePostDto } from '../post/dto/create-post.dto';
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
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'insert a user!',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiNotFoundResponse({
    description: 'only existed user ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'set a post for an user on internal app!',
  })
  @Post(':id/new-post')
  async postCreate(@Body() createPostDto: CreatePostDto, @Param() id: number) {
    return this.userService.createPost(id, createPostDto);
  }

  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'get all users on internal app!',
  })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }

  @ApiNotFoundResponse({
    description: 'only existed user ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'get a user with an ID !',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiNotFoundResponse({
    description: 'only existed user ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'update a user with an ID !',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiNotFoundResponse({
    description: 'only existed user ids are valid! ',
  })
  @ApiBadRequestResponse({
    description: 'this a monetize route you have to set x-app-key in headers',
  })
  @ApiOperation({
    description: 'remove a category with an ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
