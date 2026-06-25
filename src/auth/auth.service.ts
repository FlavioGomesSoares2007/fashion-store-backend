import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/entities/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dados: LoginDto) {
    let user: Users | null = null;

    if (dados.cpf) {
      user = await this.userRepository.findOne({
        where: { cpf: dados.cpf },
        select: ['id', 'name', 'password', 'role'], 
      });
    } else if (dados.email) {
      user = await this.userRepository.findOne({
        where: { email: dados.email },
        select: ['id', 'name', 'password', 'role'], 
      });
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordCompared = await bcrypt.compare(dados.password, user.password);

    if (!passwordCompared) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const payload = { sub: user.id, username: user.name, role: user.role };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}