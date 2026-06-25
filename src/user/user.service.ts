import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto.create';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/user.dto.update';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

 async create(dados: CreateUserDto) {
  const existingUser = await this.userRepository.findOne({
    where: [
      ...(dados.email ? [{ email: dados.email }] : []),
      ...(dados.cpf ? [{ cpf: dados.cpf }] : []),
    ],
  });

  if (existingUser) {
    if (dados.email && existingUser.email === dados.email) {
      throw new ConflictException('This email address is already in use.');
    } 
    
    if (dados.cpf && existingUser.cpf === dados.cpf) {
      throw new ConflictException('This CPF (Brazilian taxpayer ID) is already registered.');
    }
  }

  const password = await bcrypt.hash(dados.password, 10);

  const savedUser = await this.userRepository.save({
    ...dados,
    password: password,
  });

  const { password: _, ...result } = savedUser;
  return result;
}
  async findData(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const { password, ...res } = user;
    return res;
  }
  async update(dados: UpdateUserDto, id: string) {
    const user = this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const passwordHash = await bcrypt.hash(dados.password, 10);
    dados.password = passwordHash;
    Object.assign(user, dados);
    const { password, ...res } = dados;
    return res;
  }
  async delete(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return await this.userRepository.remove(user);
  }
}
