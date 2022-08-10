import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const 멀터옵션 = {
  fileFilter: (request, file, callback) => {
    //조건에 따른 필터(저장할지말지)를 설정 할 수 있습니다.
    callback(null, true);
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      //저장공간을 설정 합니다.
      const uploadPath = './upload';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      //파일 이름 설정 합니다.
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 최대값 입니다. (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};
