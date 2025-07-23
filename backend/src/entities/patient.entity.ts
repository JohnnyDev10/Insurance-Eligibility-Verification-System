import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EligibilityCheck } from './eligibility-check.entity';

@Entity('patients')
export class Patient {
  @Column({ type: 'varchar', primary: true })
  id: string;

  @Column()
  name: string;

  @Column({ name: 'date_of_birth' })
  dateOfBirth: string;

  @OneToMany(() => EligibilityCheck, check => check.patient)
  eligibilityChecks: EligibilityCheck[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}