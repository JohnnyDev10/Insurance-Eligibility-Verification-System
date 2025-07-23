import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { EligibilityCheck } from '../entities/eligibility-check.entity';
import { CreateEligibilityCheckDto } from './dto/eligibility-check.dto';
export declare class EligibilityService {
    private patientRepository;
    private eligibilityCheckRepository;
    constructor(patientRepository: Repository<Patient>, eligibilityCheckRepository: Repository<EligibilityCheck>);
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
    private mockEligibilityCheck;
}
