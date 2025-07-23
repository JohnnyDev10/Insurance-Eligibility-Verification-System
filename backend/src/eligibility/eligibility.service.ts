import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { EligibilityCheck } from '../entities/eligibility-check.entity';
import { CreateEligibilityCheckDto } from './dto/eligibility-check.dto';

@Injectable()
export class EligibilityService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(EligibilityCheck)
    private eligibilityCheckRepository: Repository<EligibilityCheck>,
  ) {}

  async checkEligibility(dto: CreateEligibilityCheckDto) {
    // Find or create patient
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

    // Mock eligibility check logic
    const eligibilityResult = this.mockEligibilityCheck(dto);

    // Create eligibility check record
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

  async getEligibilityHistory(patientId: string) {
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

  private mockEligibilityCheck(dto: CreateEligibilityCheckDto) {
    // Mock logic based on insurance company and member number
    const insuranceCompany = dto.insuranceCompany.toLowerCase();
    const memberNumber = dto.memberNumber;

    // Simulate different scenarios
    if (memberNumber.startsWith('INACTIVE')) {
      return {
        status: 'Inactive' as const,
        errors: ['Member coverage is inactive'],
      };
    }

    if (memberNumber.startsWith('ERROR')) {
      return {
        status: 'Unknown' as const,
        errors: ['Unable to verify eligibility', 'Insurance company system unavailable'],
      };
    }

    // Active case with coverage info
    const coverageTemplates = {
      'blue cross': { deductible: 1000, copay: 25, outOfPocketMax: 5000 },
      'aetna': { deductible: 1500, copay: 30, outOfPocketMax: 6000 },
      'cigna': { deductible: 800, copay: 20, outOfPocketMax: 4500 },
      'united healthcare': { deductible: 1200, copay: 35, outOfPocketMax: 5500 },
    };

    const coverage = coverageTemplates[insuranceCompany] || { deductible: 1000, copay: 25, outOfPocketMax: 5000 };

    return {
      status: 'Active' as const,
      coverageInfo: coverage,
    };
  }
}