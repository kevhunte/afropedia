import { Test, TestingModule } from '@nestjs/testing';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';

describe('TimelineController', () => {
  let controller: TimelineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimelineController],
      providers: [TimelineService],
    }).compile();

    controller = module.get<TimelineController>(TimelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns paginated events', () => {
    const result = controller.getTimeline('1', '5');
    expect(result.data.length).toBeLessThanOrEqual(5);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(5);
  });

  it('filters by startYear', () => {
    const result = controller.getTimeline(undefined, undefined, '1800');
    result.data.forEach((event) => {
      expect(event.year).toBeGreaterThanOrEqual(1800);
    });
  });

  it('returns second page', () => {
    const page1 = controller.getTimeline('1', '3');
    const page2 = controller.getTimeline('2', '3');
    expect(page1.data[0]?.id).not.toBe(page2.data[0]?.id);
  });
});
