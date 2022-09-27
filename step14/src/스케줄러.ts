import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as moment from 'moment'; //npm install moment

@Injectable()
export class 스케줄러 {
  constructor(private registry: SchedulerRegistry) {}

  @Cron('*/10 * * * * *', { name: '1번' })
  스케줄10초() {
    let day: string = moment(new Date()).format('HH:mm:ss');
    console.log('1번 동작', day);
    //this.wait(21);  
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: '2번' })
  스케줄10초버전2() {
    let day: string = moment(new Date()).format('HH:mm:ss');
    console.log('2번 동작', day);
  }

  @Interval('3번', 5000)
  인터벌형식() {
    let day: string = moment(new Date()).format('HH:mm:ss');
    console.log('3번 동작', day);
  }

  @Interval('4번', 20000)
  종료해보기() {
    const map: Map<string, CronJob> = this.registry.getCronJobs();
    map.forEach((job, key) => {
      console.log('제거 : ',key);
      this.registry.deleteCronJob(key);
    });

    const inter: string[] = this.registry.getIntervals();
    inter.forEach((key) => {
      if (key !== '4번') {
        console.log('제거 : ',key);
        this.registry.deleteInterval(key);
      }
    });
    console.log('-- 종료 스케줄 동작 완료 --');
  }

  @Timeout('타임아웃', 25000)
  추가해보기() {
    //새로운 cron 형식의 스케줄러를 생성 합니다.
    const name: string = '새로만든크론잡';
    const job = new CronJob(`*/5 * * * * *`, () => {
      let day: string = moment(new Date()).format('HH:mm:ss');
      console.log(`${name} 동작`, day);
    });
    this.registry.addCronJob(name, job);
    job.start();

    //새로운 interval 형식의 스케줄러를 생성 합니다.
    const name2: string = '새로만든인터벌잡';
    const interval = setInterval(() => {
      let day: string = moment(new Date()).format('HH:mm:ss');
      console.log(`${name2} 동작`, day);
    }, 5000);
    this.registry.addInterval(name2, interval);
  }

  //sleep 형식의 함수
  private wait(sec = 20){
    let start = Date.now(), now = start;
    while (now - start < sec * 1000) {
        now = Date.now();
    }        
  }
}
