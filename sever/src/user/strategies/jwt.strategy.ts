import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'yayaPassword',
      signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') || '12h' },
    });
  }

  async validate(payload: any) {
    return {  loginId: payload.loginId, userId: payload.userId, cost: payload.cost };
  }
}
