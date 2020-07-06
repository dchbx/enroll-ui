import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AgenciesSelectors from './agencies.selectors';

@Injectable()
export class AgenciesFacade {
  loaded$ = this.store.pipe(select(AgenciesSelectors.getAgenciesLoaded));
  allAgencies$ = this.store.pipe(select(AgenciesSelectors.getAllAgencies));

  constructor(private store: Store) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
