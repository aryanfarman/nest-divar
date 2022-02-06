import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppKeyService } from '../../app-key/app-key.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from './isPublic-decorator';
import { Request } from 'express';
import { IS_ADMIN } from './isAdmin-decortor';
import { ConfigService } from '@nestjs/config';
import { isUUID } from 'class-validator';

@Injectable()
export class AppKeyGuard implements CanActivate {
  constructor(
    private readonly appKeyService: AppKeyService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (this.reflector.get(IS_ADMIN, context.getClass())) {
      if (request.headers['admin-key']) {
        return (
          request.headers['admin-key'] === this.configService.get('ADMIN_KEY')
        );
      } else {
        throw new BadRequestException(
          'you have to set admin-key in header for access to this route',
        );
      }
    }

    if (this.reflector.get(IS_PUBLIC, context.getHandler())) {
      return true;
    }

    if (!request.headers['x-app-key']) {
      throw new BadRequestException('headers must have x-app-key');
    }
    if (!isUUID(request.headers['x-app-key'])) {
      throw new NotAcceptableException('app key must be a UUID');
    }
    const appKey = request.headers['x-app-key'];
    const entity = await this.appKeyService.findOne(appKey as string);
    if (!entity) throw new UnauthorizedException('app key is not valid');
    return appKey === entity.key;
  }
}
