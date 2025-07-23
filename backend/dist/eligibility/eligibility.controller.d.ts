import { EligibilityService } from './eligibility.service';
import { CreateEligibilityCheckDto } from './dto/eligibility-check.dto';
export declare class EligibilityController {
    private readonly eligibilityService;
    constructor(eligibilityService: EligibilityService);
    checkEligibility(dto: CreateEligibilityCheckDto): Promise<{
        id: string;
        patientId: string;
        status: "Active" | "Inactive" | "Unknown";
        timestamp: string;
        coverageInfo: {
            deductible: number;
            copay: number;
            outOfPocketMax: number;
        };
        errors: string[];
        memberNumber: string;
        insuranceCompany: string;
        serviceDate: string;
    }>;
    getEligibilityHistory(patientId: string): Promise<{
        patientId: string;
        checks: {
            id: string;
            patientId: string;
            status: "Active" | "Inactive" | "Unknown";
            timestamp: string;
            coverageInfo: {
                deductible: number;
                copay: number;
                outOfPocketMax: number;
            };
            errors: string[];
            memberNumber: string;
            insuranceCompany: string;
            serviceDate: string;
        }[];
    }>;
    getAllEligibilityHistory(): Promise<{
        id: string;
        patientId: string;
        status: "Active" | "Inactive" | "Unknown";
        timestamp: string;
        coverageInfo: {
            deductible: number;
            copay: number;
            outOfPocketMax: number;
        };
        errors: string[];
        memberNumber: string;
        insuranceCompany: string;
        serviceDate: string;
    }[]>;
}
