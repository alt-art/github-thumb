import { Controller, Get, Query } from '@nestjs/common';
import { ThumbDto } from './thumb.dto';
import { ThumbService } from './thumb.service';

@Controller('thumb')
export class ThumbController {
  constructor(private thumbService: ThumbService) {}

  @Get()
  getThumb(@Query() query: ThumbDto) {
    return this.thumbService.getThumb(query.url);
  }
}
