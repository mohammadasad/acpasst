import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpWrapper } from './http_wrapper';
import { HttpCommonUtilsService } from './http_common_utils.service';
import { HttpAuthUserUtilsService } from './http_auth_user_utils.service';
import { HttpMediaService } from './http_media_utils.service';
import { DeeplinkService } from './deeplink.service';


@NgModule({
  imports: [HttpModule],
  declarations: [],
  providers: [HttpWrapper, HttpCommonUtilsService, HttpAuthUserUtilsService, HttpMediaService,DeeplinkService],
})
export class HttpWrapperModule {
}
