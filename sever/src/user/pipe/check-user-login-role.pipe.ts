import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Injectable()
export class CheckUserLoginRolePipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(value: any) {
    const { loginId } = value;
    const existingUser = await this.userService.findByLoginId(loginId);
    if (existingUser.cost !== 2 && existingUser.cost !== 1) {
      throw new HttpException('请使用管理员账户或服务员账户登录该后台', 403);
    } else {
      return value;
    }
  }
}
