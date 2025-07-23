import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity('eligibility_checks')
export class EligibilityCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient, patient => patient.eligibilityChecks)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive', 'Unknown'],
  })
  status: 'Active' | 'Inactive' | 'Unknown';

  @Column({ name: 'member_number' })
  memberNumber: string;

  @Column({ name: 'insurance_company' })
  insuranceCompany: string;

  @Column({ name: 'service_date' })
  serviceDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deductible: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  copay: number;

  @Column({ name: 'out_of_pocket_max', type: 'decimal', precision: 10, scale: 2, nullable: true })
  outOfPocketMax: number;

  @Column({ type: 'text', array: true, nullable: true })
  errors: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}