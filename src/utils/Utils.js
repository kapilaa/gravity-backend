import RequestLog from './Requestlog.js';
import httpContext from 'express-http-context';
import {DateTime} from 'luxon';
class UtilC {
  constructor() {}
  sendResponse = (req, res, statusCode, statusMessage, data, startTime, additionaldata) => {
    var response = {
      statuscode: statusCode,
      statusmessage: statusMessage,
      data: data,
      additionaldata: additionaldata,
    };
    if (startTime == undefined) {
      startTime = DateTime.now().minus({hours: 1}).toMillis();
    }
    new RequestLog(req, response, startTime).then(() => {
      try {
        res.send(response);
        return;
      } catch (error) {
        console.error(error);
      }
    });
  };
  appController() {
    return httpContext.get('appcontroller');
  }
}
const Util = new UtilC();
export default {Util};