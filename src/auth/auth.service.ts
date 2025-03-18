import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) {}
    
  async validateUser(userid: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUserid(userid);
    if (!user) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }

    // 입력된 비밀번호와 저장된 해시된 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }

    return user;
  }

  async login(user: UserEntity) {
    const payload = { userid: user.userid, sub: user.id, userType: user.userType, username: user.username};
    return {
      access_token: this.jwtService.sign(payload,{secret: process.env.JWT_PASSWORD}),
    };
  }

}
