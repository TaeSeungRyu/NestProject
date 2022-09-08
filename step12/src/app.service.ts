import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, fn, col } from 'sequelize';
import { 모델 } from './모델';
import { 모델2 } from './모델2';

import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(모델) private model: typeof 모델,
    @InjectModel(모델2) private model2: typeof 모델2,
    private se: Sequelize,
  ) {

  }

  select(): Promise<모델[]> {
    return this.model.findAll({raw:true});
  }

  insert(): Promise<모델> {
    let value = {
      nest_text: this.#makeid(5),
      nest_number: Math.floor(Math.random() * 20),
      //nest_date : new Date(),  //옵션 defaultValue 동작여부 확인을 위한 주석!
      nest_idx: this.#makeid(15),
    };
    return this.model.create(value);
  }

  update() {
    let data = { nest_number: 123456 };
    let where = { nest_idx: 'aaaa' };
    return this.model.update(data, { where });
  }

  delete() {
    let where = { nest_idx: 'aaaa' };
    this.model.destroy({ where });
  }

  selectWithOption(): Promise<모델[]> {
    let option = {
      where: {
        nest_text: { [Op.like]: '%a%' },
        nest_number: { [Op.gte]: 3, [Op.lte]: 10000 },
      },
      offset: 0,
      limit: 10,
      raw: true, //조회한 결과 객체로만 표기 옵션
    };
    return this.model.findAll(option);
  }

  selectLeftOuterJoin() {
    this.model.hasMany(this.model2, {
      foreignKey: 'your_idx',
      
    });
    return this.model.findAll({
      include: [
        {
          model: this.model2,
          attributes: ['your_idx', 'friend_data', 'friend_idx'],
        },
      ],
      raw: true,
    });
  }

  selectLeftInnerJoin() {
    this.model.hasMany(this.model2, {
      foreignKey: 'your_idx',
    });
    return this.model.findAll({
      include: [
        {
          model: this.model2,
          attributes: ['your_idx', 'friend_data', 'friend_idx'],
          required: true,
        },
      ],
      raw: true,
    });
  }

  groupping() {
    return this.model.findAll({
      attributes: [
        'nest_text',
        [fn('count', col('nest_text')), 'countResult'],  //카운트
        [fn('sum', col('nest_number')), 'sumResult'],    //합계
      ],
      group: ['nest_text'],  //그룹할 필드
      raw: true,
      
    });
  }

  async gogoTransaction(){
/**
#1. transaction 함수에서 줄 수 있는 옵션
{
    autocommit?: boolean;
    isolationLevel?: Transaction.ISOLATION_LEVELS;
    type?: Transaction.TYPES;
    deferrable?: string | Deferrable;
}

#2. 격리수준 종류
enum ISOLATION_LEVELS {
    READ_UNCOMMITTED = 'READ UNCOMMITTED',
    READ_COMMITTED = 'READ COMMITTED',
    REPEATABLE_READ = 'REPEATABLE READ',
    SERIALIZABLE = 'SERIALIZABLE'
}
#3. 프로미스를 await하지 않는경우 생기는 오류 문구
  ->  The rejected query is attached as the 'sql' property of this error
*/
    let tran = await this.se.transaction({autocommit : false});
    try {
      
      let value = {
        nest_text: 'aaㅠㅠaa',
        nest_number: 1111,
        nest_idx: this.#makeid(15),
      };
      await this.model.create(value,{transaction : tran});

      value = {
        nest_text: 'bbbb',
        nest_number: 1111,
        nest_idx: this.#makeid(415),  //일부러 20자릿수 초과를 넣어봅니다.
      };
      await this.model.create(value,{transaction : tran});

      await tran.commit();  //다 됬으면 커밋


    } catch (error) {
      console.log(error)
      tran.rollback();
    }
  }

  #makeid(length) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
