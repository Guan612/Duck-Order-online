import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, pass: string): Promise<any> {
    // 验证用户身份，例如检查密码
    const user = await this.userService.findByLoginId(loginId);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result; // 返回不包含密码的用户信息
    }
    return null;
  }

  async login(user: any) {
    // 颁发 JWT
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload), // 生成并返回 JWT
    };
  }
}
