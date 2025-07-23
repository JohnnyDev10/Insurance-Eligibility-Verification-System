import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EligibilityModule } from './eligibility/eligibility.module';
import { Patient } from './entities/patient.entity';
import { EligibilityCheck } from './entities/eligibility-check.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Patient, EligibilityCheck],
      synchronize: true, // Only for development
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    EligibilityModule,
  ],
})
export class AppModule {}