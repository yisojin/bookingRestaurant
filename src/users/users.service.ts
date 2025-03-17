import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

    async findUserByUserid(userid: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: { userid: userid } });
      }
}
