import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
export declare const GetJwtConfig: (configService: ConfigService) => Promise<JwtModuleOptions>;
