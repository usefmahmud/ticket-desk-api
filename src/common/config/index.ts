import { ConfigModule } from '@nestjs/config';

export const EnvConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.local', '.env'],
});
