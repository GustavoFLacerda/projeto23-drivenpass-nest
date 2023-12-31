import { Injectable, Scope } from '@nestjs/common';
import { UserDTO } from './UserDTO';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {

  private SALT = 10;
  constructor(private readonly prisma: PrismaService) { }

  create(userDto: UserDTO) {
    return this.prisma.user.create({
      data: {
        ...userDto,
        password: bcrypt.hashSync(userDto.password, this.SALT)
      }
    })
  }

  getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email }
    })
  }

  getUserByPassword(password: string){
    return this.prisma.user.findFirst({
      where:{password}
    })
  }
}