import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ToastsActions from './toasts.actions';
import { ToastsEntity } from './toasts.models';

export const TOASTS_FEATURE_KEY = 'toasts';

export interface State extends EntityState<ToastsEntity> {
  selectedId?: string | number; // which Toasts record has been selected
  loaded: boolean; // has the Toasts list been loaded
  error?: string | null; // last none error (if any)
}

export interface ToastsPartialState {
  readonly [TOASTS_FEATURE_KEY]: State;
}

export const toastsAdapter: EntityAdapter<ToastsEntity> = createEntityAdapter<
  ToastsEntity
>();

export const initialState: State = toastsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const toastsReducer = createReducer(
  initialState,
  on(ToastsActions.loadToasts, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ToastsActions.loadToastsSuccess, (state, { toasts }) =>
    toastsAdapter.addAll(toasts, { ...state, loaded: true })
  ),
  on(ToastsActions.loadToastsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return toastsReducer(state, action);
}
