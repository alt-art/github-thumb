import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { JSDOM } from 'jsdom';

@Injectable()
export class ThumbService {
  axiosClient = axios.create();
  async getThumb(url: string) {
    try {
      const response = await this.axiosClient.get(url);
      const html = response.data;
      const dom = new JSDOM(html);
      const document = dom.window.document;
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        return ogImage.getAttribute('content');
      }
      return null;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
