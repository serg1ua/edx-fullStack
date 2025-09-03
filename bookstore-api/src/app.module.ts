import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CustomerModule,
  ],
})
export class AppModule {}
