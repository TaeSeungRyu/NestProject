import { Table, Column, Model,PrimaryKey } from 'sequelize-typescript';

@Table({
    modelName : 'nestjs_table', 
    freezeTableName : true,  //테이블에 s 붙이지 않는 옵션
    timestamps : false //createdAt, updatedAt 필드 생성유무
})
export class 모델 extends Model<모델> {

  @Column
  nest_text: string;

  @Column
  nest_number: number;

  @Column({defaultValue : new Date()})
  nest_date: Date;

  @PrimaryKey
  @Column
  nest_idx: string;  
}
