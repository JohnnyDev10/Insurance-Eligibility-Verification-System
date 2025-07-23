export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
}

export interface Insurance {
  memberNumber: string;
  insuranceCompany: string;
}

export interface EligibilityCheckRequest {
  patientId: string;
  name: string;
  dateOfBirth: string;
  memberNumber: string;
  insuranceCompany: string;
  serviceDate: string;
}

export interface CoverageInfo {
  deductible: number;
  copay: number;
  outOfPocketMax: number;
}

export interface EligibilityCheckResponse {
  id: string;
  patientId: string;
  status: 'Active' | 'Inactive' | 'Unknown';
  timestamp: string;
  coverageInfo?: CoverageInfo;
  errors?: string[];
  memberNumber: string;
  insuranceCompany: string;
  serviceDate: string;
}

export interface EligibilityHistory {
  patientId: string;
  checks: EligibilityCheckResponse[];
}