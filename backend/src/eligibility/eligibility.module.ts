import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EligibilityController } from './eligibility.controller';
import { EligibilityService } from './eligibility.service';
import { Patient } from '../entities/patient.entity';
import { EligibilityCheck } from '../entities/eligibility-check.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, EligibilityCheck])],
  controllers: [EligibilityController],
  providers: [EligibilityService],
})
export class EligibilityModule {}