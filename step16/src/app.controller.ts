import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload as pd, ClientProxy } from '@nestjs/microservices';
import {take} from 'rxjs';

@Controller()
export class AppController {

  constructor(@Inject('MY_MQTT_SERVICE') private client : ClientProxy) { //* MY_MQTT_SERVICE : 의존성 이름
    setTimeout(() => {
      //const data = {number : Math.random(), text : AppController.name};
      //this.client.send('Korean',data).pipe(take(1)).subscribe();      
    }, 3000);
  }


  @MessagePattern('World')  //구독하는 주제1
  모두받기(@pd() data){
    console.log(data);
  }


  @MessagePattern('American')  //구독하는 주제2
  고유받기(@pd() data){
    console.log(data);
  }  
}
