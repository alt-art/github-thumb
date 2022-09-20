import { IsUrl } from 'class-validator';

export class ThumbDto {
  @IsUrl()
  url: string;
}
