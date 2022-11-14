import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { RedisService } from '../redis/redis.service';
import { ThumbService } from '../thumb/thumb.service';
import { Repository } from './repos.dto';

@Injectable()
export class ReposService {
  constructor(
    private httpService: HttpService,
    private thumbService: ThumbService,
    private redisService: RedisService,
  ) {}

  async getRepos() {
    const reposCache = await this.redisService.get('repos');
    if (reposCache) {
      return JSON.parse(reposCache);
    }
    const { data } = await firstValueFrom(
      this.httpService
        .get<Repository[]>('https://api.github.com/users/alt-art/repos', {
          params: {
            sort: 'updated',
            type: 'owner',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.message, error.response.status);
          }),
        ),
    );
    const metaImages = data.map((repo) =>
      this.thumbService.getThumb(repo.html_url),
    );
    const thumbs = await Promise.all(metaImages);

    const repos = data.map((repo, index) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      thumb: thumbs[index],
    }));
    await this.redisService.set('repos', JSON.stringify(repos));
    return repos;
  }
}
