import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body('name') name: string,
    @Body('surname') surname: string,
    @Body('username') username: string,
    @Body('birth_date') birth_date: Date,
  ) {
    return this.userService.create(name, surname, username, birth_date);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
