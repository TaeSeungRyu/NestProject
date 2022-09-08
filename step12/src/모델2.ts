import { Table, Column, Model,PrimaryKey } from 'sequelize-typescript';

@Table({
    modelName : 'nestjs_table_friend', 
    freezeTableName : true,  //테이블에 s 붙이지 않는 옵션
    timestamps : false //createdAt, updatedAt 필드 생성유무
})
export class 모델2 extends Model<모델2> {
  @Column
  your_idx: string;

  @Column
  friend_data: string;

  @PrimaryKey
  @Column
  friend_idx: string;  
}
