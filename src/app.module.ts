import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {InformationModule} from './Information/information.module';

@Module({
  imports: [ InformationModule, 
    TypeOrmModule.forRoot({
      type: 'postgres', //тип подключаемой БД
      port: 5432, //порт
      username: 'education', //имя пользователя
      password: 'password', //пароль
      database: 'project',
      host: 'localhost', //хост, в нашем случае БД развернута локально
      synchronize: true,
      logging: 'all', //включим логирование для удобства отслеживания процессов
	    entities: ["dist/**/*.entity{.ts,.js}"], //указываем путь к сущности Entity
      migrations: ["src/migrations/*.ts"],
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
