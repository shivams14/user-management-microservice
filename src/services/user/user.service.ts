import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(name: string, surname: string, username: string, birth_date: Date): Promise<User> {
    const newUser = new this.userModel({ name, surname, username, birth_date });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return this.userModel.deleteOne({ _id: new Types.ObjectId(id) }).exec();
  }
}
