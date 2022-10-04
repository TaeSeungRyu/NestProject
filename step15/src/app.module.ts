import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';  //npm install moment

//silly=0(lowest), debug=1, verbose=2, info=3, warn=4, error=5(highest)
const level값 = process.env.NODE_ENV === 'production' ? 'error' : 'silly';
const format값 = winston.format.combine(
  winston.format.timestamp(),
  utilities.format.nestLike('앞에붙는명칭', { prettyPrint: true }),
);

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: level값,
          format: format값,
        }),
        new winston.transports.File({
          dirname: `./${moment(new Date()).format('YYYY-MM-DD')}`,
          filename: 'history.log',
          level: level값,
          format: format값,
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
