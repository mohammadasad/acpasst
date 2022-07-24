import { LocalStorageService } from './../core/local-storage.service';
import { Injectable } from '@angular/core';
import { UrlConstants, Constants, UrlResponseCodes } from '../core/constants';
import { HttpWrapper } from './http_wrapper';

@Injectable()
export class HttpMediaService {

    constructor(private myHttp: HttpWrapper) {
        myHttp.setHeader(Constants.authToken, LocalStorageService.getToken());
        // myHttp.setHeader('appVersion', Constants.appVersion);
    }
}
