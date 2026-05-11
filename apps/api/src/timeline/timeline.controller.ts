import { Controller, Get, Query } from '@nestjs/common';
import type { PaginatedResponse, TimelineEvent, TimelineQuery } from '@afropedia/shared';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  getTimeline(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('startYear') startYear?: string,
    @Query('endYear') endYear?: string,
    @Query('category') category?: string,
    @Query('region') region?: string,
  ): PaginatedResponse<TimelineEvent> {
    const query: TimelineQuery = {
      ...(page !== undefined && { page: parseInt(page, 10) }),
      ...(pageSize !== undefined && { pageSize: parseInt(pageSize, 10) }),
      ...(startYear !== undefined && { startYear: parseInt(startYear, 10) }),
      ...(endYear !== undefined && { endYear: parseInt(endYear, 10) }),
      ...(category !== undefined && { category }),
      ...(region !== undefined && { region }),
    };
    return this.timelineService.getTimeline(query);
  }
}
