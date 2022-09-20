import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ThumbService {
  axiosClient = axios.create();

  constructor(private readonly redisService: RedisService) {}

  async getThumb(url: string) {
    try {
      const cachedThumb = await this.redisService.get(`thumb:${url}`);
      if (cachedThumb) {
        return cachedThumb;
      }
      const response = await this.axiosClient.get(url);
      const html = response.data;
      const dom = new JSDOM(html);
      const document = dom.window.document;
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        const thumb = ogImage.getAttribute('content');
        await this.redisService.set(`thumb:${url}`, thumb);
        return thumb;
      }
      return null;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
