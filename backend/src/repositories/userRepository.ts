import { UIuserRepository, User } from "../types/usersTypes";
import { UserModel } from "../models/users.models";
import { Query } from "../types/repositoryTypes";

export class UserRepository implements UIuserRepository {
  async create(data: User): Promise<User> {
    const newUser = new UserModel(data);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await UserModel.find().exec();
  }

  async findOne(query: Query): Promise<User | null> {
    return await UserModel.findOne(query);
  }

  async findById(id: string): Promise<User> {
    const user = await UserModel.findById(id).exec();
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }
  async update(id: string, data: User): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }
  async delete(id: string): Promise<void> {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return;
  }
}
