import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, finalize, Observable, tap } from 'rxjs';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Injectable()
export class TimeLoggerInterceptor implements NestInterceptor {
  constructor(private logger: MyLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const contextName = `${context.getClass().name}.${context.getHandler().name}`;
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${request.method} ${request.url} - Success`,
          contextName,
        );
      }),
      catchError((error) => {
        this.logger.error(
          `${request.method} ${request.url} - Error: ${error.message}`,
          contextName,
        );
        throw error;
      }),
      finalize(() => {
        this.logger.log(
          `${request.method} ${request.url} completed in ${Date.now() - now}ms`,
          contextName,
        );
      }),
    );
  }
}
