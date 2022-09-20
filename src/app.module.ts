import { Module } from '@nestjs/common';
import { ThumbController } from './thumb/thumb.controller';
import { ThumbService } from './thumb/thumb.service';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';
@Module({
  imports: [RedisModule],
  controllers: [ThumbController],
  providers: [ThumbService, RedisService],
})
export class AppModule {}
