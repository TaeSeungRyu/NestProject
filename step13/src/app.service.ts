import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {내도큐먼트, 내타입} from './내도큐먼트';

@Injectable()
export class AppService {

  constructor(@InjectModel(내도큐먼트.name) private doc : Model<내타입>) {
    
    /*
    //만약 레플리카셋으로 구성되어 있으면 이벤트에 따른 리스너도 동작 합니다!
    doc.watch().on('change', arg=>{
      console.log(arg)
    })
    */

    this.groupByWithFacet();
  }

  insertType1(){
    const data1 = new this.doc({text:'abcd', num : 1234, arr : [1,2,3,4,5]});
    data1.save();
  }

  insertType2(){
    const docs = [
      new this.doc({text:'abcd', num : 5678, arr : [1,2,3,4,5]}),
      new this.doc({text:'ggqe', num : 8923, arr : [11,22]}),
      new this.doc({text:'refw', num : 5123, arr : ['aaa', 'fff', 12121]})
    ];
    this.doc.insertMany(docs);
  }

  select(){
    this.doc.find({text :{$regex : 'ab'}}, (err, arg : Array<any>)=>{
      if(err) return;
      arg.forEach(  (element : 내도큐먼트) => {
        console.log(element)
      });
    })
  }

  update (_id : string = '631992be602911b2c3b92474'){
    //upsert가 true 면 insert 행위를 함
    this.doc.updateOne({ _id }, {$set: {text:'bbbbbb'}}, {upsert : true}, err=>{
      console.log(err)
    });

  }

  delete (_id : string = '631992be602911b2c3b92474'){
    this.doc.remove({ _id }, err=>{
      console.log(err)
    });
  }

  groupBy(){
    this.doc.aggregate([
      { 
        $project: {   //가져올 데이터 선언
          text: 1, 
          num: 1, 
          createdAt:1,
          arr : 1,
          dateToStr: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },  //날짜를 문자로 바꾸기1
          dateToStrMonth: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, //날짜를 문자로 바꾸기2
          dateToStrYear: { $dateToString: { format: "%Y", date: "$createdAt" } }, //날짜를 문자로 바꾸기3
          ArrayCnt : { $cond: { if: { $isArray: "$arr" }, then: { $size: "$arr" }, else: 0} }, //배열의 원소 갯수를 측정한뒤 숫자로 바꾸기
          ArraySum : { $cond: { if: { $isArray: "$arr" }, then: { $sum: "$arr" }, else: 0} }  //배열의 숫자 원소의 각각 합을 구하기
        }
      },
      { $match: { num: { $gte: 5 }}},   //조건
      { 
        $group: { 
          _id : "$text",  //그룹할 대상
          firstCreateDate : { $first: "$createdAt" },  //가장 처음값만 가져오기
          lastCreateDate : { $last: "$createdAt" },  //가장 나중값만 가져오기
          dataSum : { $sum: "$num" },  //sum 속성의 합계 구하기
          dataCount : { $sum: 1 },  //그룹한 text의 총 갯수 
          ArraySum : { $sum: "$ArraySum" },  //ArraySum 값의 총 합
          ArrayCount : { $sum: "$ArrayCnt" }, //ArrayCnt 값의 총 합
          pushStyle: { $push: "$dateToStr" }  //dateToStr 값을 배열형태로 밀어넣기
        }
      }, 
      { $skip: 0 },  //페이징을 위한 시작지점 커서
      { $limit: 50 } //페이징을 위한 갯수
    ]).allowDiskUse(true).then( arg=>{
      console.log(arg)
    }).catch(err=>{
      console.log(err)
    })
  }

  groupByWithFacet(){
    this.doc.aggregate().facet({
      result1 : [{$group : {_id : "$text"}}],
      result2 : [{$group : {_id : "$num"}}]
    }).then( arg=>{
      console.log(arg[0])
    }).catch(err=>{
      console.log(err)
    })
  }  


}
