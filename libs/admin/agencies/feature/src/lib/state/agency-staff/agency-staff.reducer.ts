import { createReducer, on, Action } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';

import {
  AgencyStaff,
  AgencyStaffWithDetail,
  ApiError,
} from '@hbx/api-interfaces';

import { AgencyStaffEntity } from './agency-staff.models';
import * as AgencyStaffActions from './agency-staff.actions';
import {
  changeAgencyRoleStatus,
  changeAgencyRoleStatusDetail,
  undoAgencyRoleStatusDetailChange,
} from '../../utils/changeAgencyRoleStatus';

export const AGENCYSTAFF_FEATURE_KEY = 'agencyStaff';

function selectAgencyStaffId(a: AgencyStaffEntity): string {
  //In this case this would be optional since primary key is id
  return a._id;
}

// Sort by last name first, then first name
function sortStaff(a: AgencyStaffEntity, b: AgencyStaffEntity): number {
  if (a.last_name.localeCompare(b.last_name) === 0) {
    return a.first_name.localeCompare(b.first_name);
  }

  return a.last_name.localeCompare(b.last_name);
}

export interface State extends EntityState<AgencyStaffEntity> {
  selectedId?: string | number; // which AgencyStaff record has been selected
  loaded: boolean; // has the AgencyStaff list been loaded
  error?: ApiError; // last none e (if any)
  agencyStaffDetail?: AgencyStaffWithDetail;
}

export interface AgencyStaffPartialState {
  readonly [AGENCYSTAFF_FEATURE_KEY]: State;
}

export const agencyStaffAdapter: EntityAdapter<AgencyStaffEntity> = createEntityAdapter<
  AgencyStaffEntity
>({
  selectId: selectAgencyStaffId,
  sortComparer: sortStaff,
});

export const initialState: State = agencyStaffAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const agencyStaffReducer = createReducer(
  initialState,
  on(AgencyStaffActions.loadAgencyStaff, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AgencyStaffActions.loadAgencyStaffSuccess, (state, { agencyStaff }) =>
    agencyStaffAdapter.setAll(agencyStaff, { ...state, loaded: true })
  ),
  on(
    AgencyStaffActions.loadAgencyStaffFailure,
    (state, { errorResponse: e }) => ({
      ...state,
      error: e,
    })
  ),
  on(AgencyStaffActions.terminateAgencyRole, (state, { request }) => {
    const updatedStaff: Update<AgencyStaff> = changeAgencyRoleStatus(
      state.entities,
      request
    );

    return agencyStaffAdapter.updateOne(updatedStaff, state);
  }),
  on(AgencyStaffActions.terminateAgencyRoleFailure, (state, { request }) => {
    const updatedStaff: Update<AgencyStaff> = changeAgencyRoleStatus(
      state.entities,
      request
    );

    return agencyStaffAdapter.updateOne(updatedStaff, state);
  }),
  on(AgencyStaffActions.terminateAgencyRoleDetailPage, (state, { request }) => {
    const updatedStaff: Update<AgencyStaff> = changeAgencyRoleStatus(
      state.entities,
      request
    );

    const updatedStaffDetail: AgencyStaffWithDetail = changeAgencyRoleStatusDetail(
      state.agencyStaffDetail,
      request
    );

    return agencyStaffAdapter.updateOne(updatedStaff, {
      ...state,
      agencyStaffDetail: updatedStaffDetail,
    });
  }),
  on(
    AgencyStaffActions.terminateAgencyRoleDetailPageFailure,
    (state, { request }) => {
      const updatedStaff: Update<AgencyStaff> = changeAgencyRoleStatus(
        state.entities,
        request
      );

      const updatedStaffDetail: AgencyStaffWithDetail = undoAgencyRoleStatusDetailChange(
        state.agencyStaffDetail,
        request
      );

      return agencyStaffAdapter.updateOne(updatedStaff, {
        ...state,
        agencyStaffDetail: updatedStaffDetail,
      });
    }
  ),
  on(
    AgencyStaffActions.loadAgencyStaffDetailSuccess,
    (state, { agencyStaff }) => ({ ...state, agencyStaffDetail: agencyStaff })
  ),
  on(
    AgencyStaffActions.loadAgencyStaffDetailFailure,
    (state, { errorResponse: e }) => ({
      ...state,
      error: e,
    })
  ),
  on(AgencyStaffActions.clearCurrentlySelectedAgent, state => ({
    ...state,
    agencyStaffDetail: undefined,
  })),
  on(
    AgencyStaffActions.updateStaffDemographics,
    AgencyStaffActions.updateStaffDemographicsFailure,
    (state, { agencyStaff, update }) => {
      const { first_name, last_name, dob } = update;

      const updatedStaff: Update<AgencyStaff> = {
        id: agencyStaff.personId,
        changes: {
          first_name,
          last_name,
        },
      };

      const updatedStaffDetail: AgencyStaffWithDetail = {
        ...state.agencyStaffDetail,
        first_name,
        last_name,
        dob,
      };

      return agencyStaffAdapter.updateOne(updatedStaff, {
        ...state,
        agencyStaffDetail: updatedStaffDetail,
      });
    }
  ),
  on(
    AgencyStaffActions.updateStaffEmail,
    AgencyStaffActions.updateStaffEmailFailure,
    (state, { newEmails }) => {
      const updatedStaffDetail: AgencyStaffWithDetail = {
        ...state.agencyStaffDetail,
        agent_emails: newEmails,
      };

      return {
        ...state,
        agencyStaffDetail: updatedStaffDetail,
      };
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return agencyStaffReducer(state, action);
}
