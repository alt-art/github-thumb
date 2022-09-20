import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JSDOM } from 'jsdom';

@Injectable()
export class ThumbService {
  axiosClient = axios.create();
  async getThumb(url: string) {
    const response = await this.axiosClient.get(url);
    const html = response.data;
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      return ogImage.getAttribute('content');
    }
    return null;
  }
}
