import {DateTime} from 'luxon';
export default class RequestLog {
  constructor(request, response, start_time) {
    if (request.url != '/' && request.url != '/favicon.ico' && request.url != '/robots.txt') {
      let log = {};
      log['request'] = JSON.stringify(request.body);
      log['is_authenticated'] = '0';
      log['request_url'] = request.url;
      log['request_headers'] = JSON.stringify(request.headers);
      log['response'] = JSON.stringify(response);
      log['status_code'] = response.statuscode;
      log['status_message'] = response.statusmessage;
      log['response_time'] = DateTime.now().toMillis() - start_time;

      return Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
}