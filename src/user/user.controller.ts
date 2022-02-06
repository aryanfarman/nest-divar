import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreatePostDto } from '../post/dto/create-post.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guards/local-auth-guard.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { IsPublic } from '../common/guards/isPublic-decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginUserDto,
    description: 'user login.',
  })
  login(@Request() req) {
    return req.user;
  }

  @ApiHeader({
    name: 'x-app-key',
    description: 'this a monetize route you have to set x-app-key in headers',
    required: true,
  })
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
  @ApiHeader({
    name: 'x-app-key',
    description: 'this a monetize route you have to set x-app-key in headers',
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Post(':id/new-post')
  async postCreate(@Body() createPostDto: CreatePostDto, @Param() id: number) {
    return this.userService.createPost(id, createPostDto);
  }

  @ApiHeader({
    name: 'x-app-key',
    description: 'this a monetize route you have to set x-app-key in headers',
    required: true,
  })
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
    description: 'get a user with an ID !',
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
    description: 'update a user with an ID !',
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
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
    description: 'remove a user with an ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
