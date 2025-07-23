import { EligibilityCheck } from './eligibility-check.entity';
export declare class Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    eligibilityChecks: EligibilityCheck[];
    createdAt: Date;
    updatedAt: Date;
}
