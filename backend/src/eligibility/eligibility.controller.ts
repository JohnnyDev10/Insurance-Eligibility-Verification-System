import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';
import { CreateEligibilityCheckDto } from './dto/eligibility-check.dto';

@Controller('eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @Post('check')
  async checkEligibility(@Body() dto: CreateEligibilityCheckDto) {
    return this.eligibilityService.checkEligibility(dto);
  }

  @Get('history/:patientId')
  async getEligibilityHistory(@Param('patientId') patientId: string) {
    return this.eligibilityService.getEligibilityHistory(patientId);
  }

  @Get('history')
  async getAllEligibilityHistory() {
    return this.eligibilityService.getAllEligibilityHistory();
  }
}