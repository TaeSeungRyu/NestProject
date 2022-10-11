import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const clients = ClientsModule.register([
  {
    name: 'MY_MQTT_SERVICE', //* MY_MQTT_SERVICE : 의존성 이름
    transport: Transport.MQTT,
    options: {
      host: 'localhost',
      port: 1883
    }
  }
]);

@Module({
  imports: [
    clients
  ],
  controllers: [AppController],
  providers: [AppService],
  exports : [clients]
})
export class AppModule {
  constructor() {}
}
