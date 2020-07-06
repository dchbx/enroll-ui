// tslint:disable:no-any no-unsafe-any
import { Injectable, Inject } from '@angular/core';

import { TRACKING_ID } from './trackingId';
import { removeAuthToken } from './removeAuthToken';

declare var gtag: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(@Inject(TRACKING_ID) private trackingId: string) {}

  // Sets the userId for tracking
  // https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#set_user_id
  setUserId(userId: string): void {
    gtag('config', this.trackingId, {
      user_id: userId,
    });

    // need config and set
    // https://www.en.advertisercommunity.com/t5/Google-Analytics-Code/User-ID-Reports-View-not-showing-any-data/td-p/1574868
    gtag('set', { user_id: userId });
  }

  sendPage(path: string): void {
    if (this.trackingId.length > 0) {
      gtag('config', this.trackingId, {
        page_path: removeAuthToken(path),
      });
    }
  }
}
