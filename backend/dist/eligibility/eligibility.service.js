"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("../entities/patient.entity");
const eligibility_check_entity_1 = require("../entities/eligibility-check.entity");
let EligibilityService = class EligibilityService {
    constructor(patientRepository, eligibilityCheckRepository) {
        this.patientRepository = patientRepository;
        this.eligibilityCheckRepository = eligibilityCheckRepository;
    }
    async checkEligibility(dto) {
        let patient = await this.patientRepository.findOne({
            where: { id: dto.patientId }
        });
        if (!patient) {
            patient = this.patientRepository.create({
                id: dto.patientId,
                name: dto.name,
                dateOfBirth: dto.dateOfBirth,
            });
            await this.patientRepository.save(patient);
        }
        const eligibilityResult = this.mockEligibilityCheck(dto);
        const eligibilityCheck = this.eligibilityCheckRepository.create({
            patientId: dto.patientId,
            status: eligibilityResult.status,
            memberNumber: dto.memberNumber,
            insuranceCompany: dto.insuranceCompany,
            serviceDate: dto.serviceDate,
            deductible: eligibilityResult.coverageInfo?.deductible,
            copay: eligibilityResult.coverageInfo?.copay,
            outOfPocketMax: eligibilityResult.coverageInfo?.outOfPocketMax,
            errors: eligibilityResult.errors,
        });
        const savedCheck = await this.eligibilityCheckRepository.save(eligibilityCheck);
        return {
            id: savedCheck.id,
            patientId: savedCheck.patientId,
            status: savedCheck.status,
            timestamp: savedCheck.createdAt.toISOString(),
            coverageInfo: savedCheck.deductible ? {
                deductible: Number(savedCheck.deductible),
                copay: Number(savedCheck.copay),
                outOfPocketMax: Number(savedCheck.outOfPocketMax),
            } : undefined,
            errors: savedCheck.errors,
            memberNumber: savedCheck.memberNumber,
            insuranceCompany: savedCheck.insuranceCompany,
            serviceDate: savedCheck.serviceDate,
        };
    }
    async getEligibilityHistory(patientId) {
        const checks = await this.eligibilityCheckRepository.find({
            where: { patientId },
            order: { createdAt: 'DESC' },
        });
        return {
            patientId,
            checks: checks.map(check => ({
                id: check.id,
                patientId: check.patientId,
                status: check.status,
                timestamp: check.createdAt.toISOString(),
                coverageInfo: check.deductible ? {
                    deductible: Number(check.deductible),
                    copay: Number(check.copay),
                    outOfPocketMax: Number(check.outOfPocketMax),
                } : undefined,
                errors: check.errors,
                memberNumber: check.memberNumber,
                insuranceCompany: check.insuranceCompany,
                serviceDate: check.serviceDate,
            })),
        };
    }
    async getAllEligibilityHistory() {
        const checks = await this.eligibilityCheckRepository.find({
            order: { createdAt: 'DESC' },
        });
        return checks.map(check => ({
            id: check.id,
            patientId: check.patientId,
            status: check.status,
            timestamp: check.createdAt.toISOString(),
            coverageInfo: check.deductible ? {
                deductible: Number(check.deductible),
                copay: Number(check.copay),
                outOfPocketMax: Number(check.outOfPocketMax),
            } : undefined,
            errors: check.errors,
            memberNumber: check.memberNumber,
            insuranceCompany: check.insuranceCompany,
            serviceDate: check.serviceDate,
        }));
    }
    mockEligibilityCheck(dto) {
        const insuranceCompany = dto.insuranceCompany.toLowerCase();
        const memberNumber = dto.memberNumber;
        if (memberNumber.startsWith('INACTIVE')) {
            return {
                status: 'Inactive',
                errors: ['Member coverage is inactive'],
            };
        }
        if (memberNumber.startsWith('ERROR')) {
            return {
                status: 'Unknown',
                errors: ['Unable to verify eligibility', 'Insurance company system unavailable'],
            };
        }
        const coverageTemplates = {
            'blue cross': { deductible: 1000, copay: 25, outOfPocketMax: 5000 },
            'aetna': { deductible: 1500, copay: 30, outOfPocketMax: 6000 },
            'cigna': { deductible: 800, copay: 20, outOfPocketMax: 4500 },
            'united healthcare': { deductible: 1200, copay: 35, outOfPocketMax: 5500 },
        };
        const coverage = coverageTemplates[insuranceCompany] || { deductible: 1000, copay: 25, outOfPocketMax: 5000 };
        return {
            status: 'Active',
            coverageInfo: coverage,
        };
    }
};
exports.EligibilityService = EligibilityService;
exports.EligibilityService = EligibilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __param(1, (0, typeorm_1.InjectRepository)(eligibility_check_entity_1.EligibilityCheck)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EligibilityService);
//# sourceMappingURL=eligibility.service.js.map