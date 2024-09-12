import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { userInfo } from 'os';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, pass: string): Promise<any> {
    // 验证用户身份，例如检查密码
    const user = await this.userService.findByLoginId(loginId);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, createdAt, updatedAt, ...result } = user;
      return result; // 返回不包含密码的用户信息
    }
    return null;
  }

  async login(res) {
    // 颁发 JWT
    const payload = { loginId: res.loginId, sub: res.userId, cos: res.cos };
    return {
      message: '登录成功',
      userInfo: { ...res, token: this.jwtService.sign(payload) }, // 生成并返回 JWT
    };
  }
}
