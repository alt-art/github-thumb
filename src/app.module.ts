import { Module } from '@nestjs/common';
import { ThumbController } from './thumb/thumb.controller';
import { ThumbService } from './thumb/thumb.service';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';
import { ReposModule } from './repos/repos.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [RedisModule, ReposModule, HttpModule],
  controllers: [ThumbController],
  providers: [ThumbService, RedisService],
})
export class AppModule {}
