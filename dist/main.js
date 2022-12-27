"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    const port = process.env.PORT;
    await app.listen(process.env.PORT || 7100, () => {
        console.log(`Приложение запущено на ${port} порту`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map