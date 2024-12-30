import {DateTime} from 'luxon';
import Util from './utils/Utils';
const ACCEPTED_APP_VERSION_ANDROID = ['2.8', '2.9', '2.10', '3.0', '3.1', '3.2'];
const ACCEPTED_APP_VERSION_IOS = ['2.8', '2.9', '2.10', '3.0', '3.1', '3.2'];
export default class AppController {
  constructor() {
    this.token = '';
  }
  setRequest = async (req, res, next) => {
    this.req = req;
    this.res = res;
    this.next = next;
    this.startTime = DateTime.now().toMillis(); // TO DO - today date
    return await this.setLoggedInUser();
  };
  setLoggedInUser = async () => {
    try {
      if (
        process.env.NEXT_PUBLIC_INSTANCE_ENV !== undefined &&
        process.env.NEXT_PUBLIC_INSTANCE_ENV == 'PRODUCTION'
      ) {
        if (this.req.body.APP_VERSION !== undefined) {
          if (!isNaN(this.req.body.APP_VERSION)) {
            let requestedVersion = this.req.body.APP_VERSION;
            if (
              this.req.body.DEVICE_TYPE !== undefined &&
              this.req.body.DEVICE_TYPE.toUpperCase() == 'ANDROID'
            ) {
              if (ACCEPTED_APP_VERSION_ANDROID.indexOf(requestedVersion) === -1) {
                this.sendUpdateApp();
                return false;
              }
            } else {
              if (ACCEPTED_APP_VERSION_IOS.indexOf(requestedVersion) === -1) {
                this.sendUpdateApp();
                return false;
              }
            }
          }
        }
      }
     
      this.token = this.req.headers.authorization.split(' ')[1];
      var response = await this.appUser.parseToken(this.token);
      if (response.success) {
        return true;
      } else {
        this.sendUnautorized(response.error);
        return false;
        //throw new Error();
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  sendUpdateApp = () => {
    this.res.status(200);
    this.sendResponse(999, 'Update App');
  };
  sendUnautorized = error => {
    this.res.status(401);
    this.sendResponse(9, 'Unauthorized', error);
  };

  async sendResponse(statusCode, statusMessage, data, additionaldata) {
    if (additionaldata === undefined) {
      additionaldata = {};
    }
    if (data === undefined) {
      data = {};
    }
    //user and cart details
    if (statusCode == 0) {
      data.userLoggedIn = this.appUser.checkLogin();
      if (data.userLoggedIn && this.appUser.user !== null) {
        data.user = this.appUser.user;
        data.user.password = null;
      } else {
        data.user = {};
      }
    }

    Util.sendResponse(
      this.req,
      this.res,
      statusCode,
      statusMessage,
      data,
      this.startTime,
      additionaldata,
    );
  }
  sendError(err) {
    this.res.locals.message = err.message;
    this.res.locals.error = this.req.app.get('env') === 'development' ? err : {};

    // render the error page
    this.res.status(err.status || 500);
    console.error(this.res.locals);
    Util.appController().sendResponse(10, 'Sever went bonkers', this.res.locals);
  }
  requiresValidToken = async (req, res) => {
    var response = await this.appUser.parseToken(this.token);
    if (this.token !== '' && response.success) {
      return true;
    } else {
      this.sendUnautorized({});
      // throw new Error();
    }
  };
}