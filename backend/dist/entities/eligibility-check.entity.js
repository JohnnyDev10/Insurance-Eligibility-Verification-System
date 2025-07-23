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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityCheck = void 0;
const typeorm_1 = require("typeorm");
const patient_entity_1 = require("./patient.entity");
let EligibilityCheck = class EligibilityCheck {
};
exports.EligibilityCheck = EligibilityCheck;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EligibilityCheck.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'patient_id' }),
    __metadata("design:type", String)
], EligibilityCheck.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patient_entity_1.Patient, patient => patient.eligibilityChecks),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", patient_entity_1.Patient)
], EligibilityCheck.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Active', 'Inactive', 'Unknown'],
    }),
    __metadata("design:type", String)
], EligibilityCheck.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_number' }),
    __metadata("design:type", String)
], EligibilityCheck.prototype, "memberNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'insurance_company' }),
    __metadata("design:type", String)
], EligibilityCheck.prototype, "insuranceCompany", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_date' }),
    __metadata("design:type", String)
], EligibilityCheck.prototype, "serviceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EligibilityCheck.prototype, "deductible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EligibilityCheck.prototype, "copay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'out_of_pocket_max', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EligibilityCheck.prototype, "outOfPocketMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], EligibilityCheck.prototype, "errors", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], EligibilityCheck.prototype, "createdAt", void 0);
exports.EligibilityCheck = EligibilityCheck = __decorate([
    (0, typeorm_1.Entity)('eligibility_checks')
], EligibilityCheck);
//# sourceMappingURL=eligibility-check.entity.js.map