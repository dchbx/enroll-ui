import { Dictionary } from '@ngrx/entity';

import { AgencyProfile, PrimaryAgent } from '@hbx/api-interfaces';
import { PrimaryAgentVM, AgencyVM } from '@hbx/admin/shared/view-models';

export function createAgencyVM(
  profile: AgencyProfile,
  primaryAgents: Dictionary<PrimaryAgent>
): AgencyVM {
  const { agency_profile_id } = profile;

  const primaryAgent = primaryAgents[agency_profile_id];

  const primaryAgentVM: PrimaryAgentVM = {
    firstName: primaryAgent.first_name,
    lastName: primaryAgent.last_name,
    npn: primaryAgent.agent_npn,
    roleId: primaryAgent.connected_profile_id,
    hbxId: primaryAgent.hbx_id,
  };

  const agencyVM: AgencyVM = {
    agencyName: profile.legal_name,
    orgId: profile.organization_id,
    profileType: profile.agency_profile_type,
    primaryAgent: primaryAgentVM,
    agencyProfileId: primaryAgent.connected_profile_id,
  };

  return agencyVM;
}
