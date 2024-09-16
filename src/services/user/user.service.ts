import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateResult, DeleteResult } from 'mongodb';
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

  /* async updateUser(id: string, name: string, surname: string, username: string, status: number, birth_date: Date): Promise<UpdateResult> {
    return this.userModel.updateOne(
      {
        _id: new Types.ObjectId(id)
      }, {
        $set: {
          name: name,
          surname: surname,
          username: username,
          status: status,
          birth_date: birth_date
        }
      }
    ).exec();
  } */

    async updateUser(id: string, updateData: Partial<User>): Promise<User> {
      const updatedUser = await this.userModel.findByIdAndUpdate(new Types.ObjectId(id), updateData, {
        new: true, // returns the updated document
      }).exec();
    
      return updatedUser;
    }

  async deleteUser(id: string): Promise<DeleteResult> {
    return this.userModel.deleteOne({ _id: new Types.ObjectId(id) }).exec();
  }
}
