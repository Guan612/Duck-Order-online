import * as bcrypt from 'bcrypt';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { password } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    return {
      ...value, // 保留其他字段
      password: hashedPassword, // 用加密后的密码替换原来的密码
    };
  }
}
