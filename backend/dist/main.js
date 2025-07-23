"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors({
        origin: 'http://localhost:3001',
        credentials: true,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(3000);
    console.log('Backend server running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map