import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiBenefitSponsorsOrganization } from '@hbx/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BrokersApiService {
  private api = 'api/v1';

  constructor(private http: HttpClient) {}

  getAllBrokers(): Observable<ApiBenefitSponsorsOrganization[]> {
    return this.http.get<ApiBenefitSponsorsOrganization[]>(
      `${this.api}/brokers`
    );
  }
}
