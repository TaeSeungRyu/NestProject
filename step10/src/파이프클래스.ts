import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {plainToClass, plainToInstance} from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class 파이프클래스 implements PipeTransform {

    constructor(private readonly className: any) {    }

    transform(value: any, metadata: ArgumentMetadata) {
        for(let key of Object.keys(value)){
            value[key] = sanitizeHtml(value[key]);
        }
        //plainToClass는 deprecated 되었습니다.
        return plainToInstance(this.className, value, {excludeExtraneousValues : true}) ;
    }
}