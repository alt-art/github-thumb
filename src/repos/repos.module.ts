import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { ThumbService } from '../thumb/thumb.service';
import { ReposController } from './repos.controller';
import { ReposService } from './repos.service';

@Module({
  imports: [HttpModule],
  controllers: [ReposController],
  providers: [ReposService, ThumbService, RedisService],
})
export class ReposModule {}
