import { Module } from '@nestjs/common';
import { EntrysService } from './entrys.service';
import { EntrysController } from './entrys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntrysController],
  providers: [EntrysService]
})
export class EntrysModule {}
