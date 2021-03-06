import { AgencyProfile, PrimaryAgent, AgencyStaff } from '@hbx/api-interfaces';

import {
  mockAgencyProfile,
  mockManyAgencyStaff,
  mockPrimaryAgentStaffRole,
} from './agency.mock';
import { mockPrimaryAgent } from './agencyStaff.mock';

export interface ApprovedAgencyWithStaff {
  agency: AgencyProfile;
  primaryAgent: PrimaryAgent;
  agencyStaff: AgencyStaff[];
}

export function mockAgencyWithStaff(
  agencyProfileId: string
): ApprovedAgencyWithStaff {
  const primaryAgent = mockPrimaryAgent(agencyProfileId);
  const agency = mockAgencyProfile(agencyProfileId);
  const agencyStaff = mockManyAgencyStaff(agencyProfileId);
  const primaryAgentStaffRole = mockPrimaryAgentStaffRole(primaryAgent);

  return {
    primaryAgent,
    agency,
    agencyStaff: [primaryAgentStaffRole, ...agencyStaff],
  };
}
