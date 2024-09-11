import { PipeTransform, Injectable, HttpException } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Injectable()
export class CheckUserExistsPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: any) {
    const { loginId } = value; // 从请求体中提取 loginId

    // 调用 UserService 查询用户是否存在
    const existingUser = await this.userService.findByLoginId(loginId);

    // 如果用户已存在，抛出异常
    if (existingUser) {
      throw new HttpException('该用户已注册', 409);
    }

    // 返回未经修改的请求体以供后续处理
    return value;
  }
}
