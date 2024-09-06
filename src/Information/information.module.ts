import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { Information } from './information.entity';

@Module({
  controllers: [InformationController],
  providers: [InformationService],
  imports: [
    TypeOrmModule.forFeature([Information])
  ],
})
export class InformationModule {} 