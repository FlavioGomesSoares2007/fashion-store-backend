import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto.create';
import { UpdateUserDto } from './dto/user.dto.update';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dados: CreateUserDto) {
    return this.userService.create(dados);
  }

  @Get(':id')
  findData(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findData(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dados: UpdateUserDto
  ) {
    return this.userService.update(dados, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}