import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEligibilityCheckDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  memberNumber: string;

  @IsString()
  @IsNotEmpty()
  insuranceCompany: string;

  @IsDateString()
  serviceDate: string;
}