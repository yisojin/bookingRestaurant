import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userid: string, password: string): Promise<any> {
    const user = this.authService.validateUser(userid, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}