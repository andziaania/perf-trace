import { UsersMockService } from './users-mock.service';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { materialize, delay, dematerialize, mergeMap } from 'rxjs/operators';


const GET_METHOD = 'GET';

const PATTERNS = {
  USERS_TOTAL_DAILY: /\/users\/total\/day\/\d+$/,
  USERS_TOTAL_WEEKLY: /\/users\/total\/week\/\d+$/,
  USERS_TOTAL_MONTHLY: /\/users\/total\/month\/\d+$/,
  USERS_NEW_DAILY: /\/users\/new\/day\/\d+$/,
  USERS_NEW_WEEKLY: /\/users\/new\/week\/\d+$/,
  USERS_NEW_MONTHLY: /\/users\/new\/month\/\d+$/,
  USERS_RETURNING_DAILY: /\/users\/returning\/day\/\d+$/,
  USERS_RETURNING_WEEKLY: /\/users\/returning\/week\/\d+$/,
  USERS_RETURNING_MONTHLY: /\/users\/returning\/month\/\d+$/
};

/**
 * This interceptor catches specyfic URL requests and returns mock values for them.
 */
@Injectable()
export class ServerSimulatorInterceptor implements HttpInterceptor {


  constructor(private usersService: UsersMockService) { }

  /**
   * Wraps in delayed observable to simulate server api call.
   * Call materialize and dematerialize to ensure delay even if an error
   * is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`HTTP mock-backend-interceptor scans request: : ${request.url}`);
    // return next.handle(request);
    return of(null)
      .pipe(mergeMap(() => this.rootRequest(request, next)))
      .pipe(materialize())
      .pipe(delay(500))
    .pipe(dematerialize());
  }

  rootRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    switch (true) {
      case url.match(PATTERNS.USERS_TOTAL_DAILY) && method === GET_METHOD:
        return ok(this.usersService.genDailyUsersActivity());
      case url.match(PATTERNS.USERS_TOTAL_WEEKLY) && method === GET_METHOD:
        return ok(this.usersService.genWeeklyUsersActivity());
      case url.match(PATTERNS.USERS_TOTAL_MONTHLY) && method === GET_METHOD:
        return ok(this.usersService.genMonthlyUsersActivity());
      case url.match(PATTERNS.USERS_NEW_DAILY) && method === GET_METHOD:
        return ok(this.usersService.genDailyUsersActivity());
      case url.match(PATTERNS.USERS_NEW_WEEKLY) && method === GET_METHOD:
        return ok(this.usersService.genWeeklyUsersActivity());
      case url.match(PATTERNS.USERS_NEW_MONTHLY) && method === GET_METHOD:
        return ok(this.usersService.genMonthlyUsersActivity());
      case url.match(PATTERNS.USERS_RETURNING_DAILY) && method === GET_METHOD:
        return ok(this.usersService.genDailyUsersActivity());
      case url.match(PATTERNS.USERS_RETURNING_WEEKLY) && method === GET_METHOD:
        return ok(this.usersService.genWeeklyUsersActivity());
      case url.match(PATTERNS.USERS_RETURNING_MONTHLY) && method === GET_METHOD:
        return ok(this.usersService.genMonthlyUsersActivity());
      default:
        console.log(`passes throuhg this request: ${request.url}`);
        return next.handle(request);
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

  }
}
