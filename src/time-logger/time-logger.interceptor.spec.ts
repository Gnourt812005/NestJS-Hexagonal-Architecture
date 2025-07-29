import { TimeLoggerInterceptor } from './time-logger.interceptor';

describe('TimeLoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new TimeLoggerInterceptor()).toBeDefined();
  });
});
