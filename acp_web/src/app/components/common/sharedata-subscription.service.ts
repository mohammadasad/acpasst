import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { AlertState } from './show-alert-toast/alert-state';

@Injectable()
export class ShareDataSubscriptionService {

  private alertSubject = new Subject<AlertState>();
  alertState = this.alertSubject.asObservable();

  constructor() {
  }
  show(type, statusCode, statusMessage, alertTime?: any) {
    if (alertTime) {
      this.alertSubject.next(<AlertState>{'alertType': type, 'statusCode': statusCode,
      'statusMessage': statusMessage, 'alertTime': alertTime});
    } else {
      this.alertSubject.next(<AlertState>{'alertType': type, 'statusCode': statusCode,'statusMessage': statusMessage});
    }
}
}
