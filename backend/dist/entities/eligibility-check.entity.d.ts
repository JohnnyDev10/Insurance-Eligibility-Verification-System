import { Patient } from './patient.entity';
export declare class EligibilityCheck {
    id: string;
    patientId: string;
    patient: Patient;
    status: 'Active' | 'Inactive' | 'Unknown';
    memberNumber: string;
    insuranceCompany: string;
    serviceDate: string;
    deductible: number;
    copay: number;
    outOfPocketMax: number;
    errors: string[];
    createdAt: Date;
}
