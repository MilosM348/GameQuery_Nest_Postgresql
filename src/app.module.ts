import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ZonesModule } from './zones/zones.module';
import { TypesModule } from './types/types.module';
import { RegionsModule } from './regions/regions.module';
import { EntrysModule } from './entrys/entrys.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Danil123!@#',
      database: 'gamequery',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ZonesModule,
    TypesModule,
    RegionsModule,
    EntrysModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
