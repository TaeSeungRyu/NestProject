import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as sch } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,  //자동으로 등록일, 수정일을 넣어줍니다.
  collection : 'testCollection',
  _id : true  //기본 인덱스인 id값을 매핑하여 줍니다.
};

@Schema(options)
export class 내도큐먼트 extends Document {
 
  @Prop({type : sch.Types.String})
  text : string;

  @Prop({type : sch.Types.Number})
  num : number;

  @Prop({type : sch.Types.Array})
  arr : Array<any>;  
}
export const 내스키마 = SchemaFactory.createForClass(내도큐먼트);
export type 내타입 = 내도큐먼트 & Document;