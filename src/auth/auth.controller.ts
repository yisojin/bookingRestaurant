import { Body, Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/jwt-auth/local-auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { LoginDto } from 'src/users/dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary:'로그인'})
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.userid, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('로그인 실패');
    }
    return this.authService.login(user);
  }

  // 테스트용
  @ApiOperation({summary:'테스트용 유저조회'})
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  } 
}