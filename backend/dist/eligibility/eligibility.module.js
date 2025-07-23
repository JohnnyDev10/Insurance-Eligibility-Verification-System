"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const eligibility_controller_1 = require("./eligibility.controller");
const eligibility_service_1 = require("./eligibility.service");
const patient_entity_1 = require("../entities/patient.entity");
const eligibility_check_entity_1 = require("../entities/eligibility-check.entity");
let EligibilityModule = class EligibilityModule {
};
exports.EligibilityModule = EligibilityModule;
exports.EligibilityModule = EligibilityModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([patient_entity_1.Patient, eligibility_check_entity_1.EligibilityCheck])],
        controllers: [eligibility_controller_1.EligibilityController],
        providers: [eligibility_service_1.EligibilityService],
    })
], EligibilityModule);
//# sourceMappingURL=eligibility.module.js.map