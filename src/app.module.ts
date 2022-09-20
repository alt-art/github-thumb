import { Module } from '@nestjs/common';
import { ThumbController } from './thumb/thumb.controller';
import { ThumbService } from './thumb/thumb.service';
@Module({
  imports: [],
  controllers: [ThumbController],
  providers: [ThumbService],
})
export class AppModule {}
