import { Controller, Get } from '@nestjs/common';
import { Repository } from './repos.dto';
import { ReposService } from './repos.service';

@Controller('repos')
export class ReposController {
  constructor(private reposService: ReposService) {}

  @Get()
  getRepos(): Promise<Repository[]> {
    return this.reposService.getRepos();
  }
}
